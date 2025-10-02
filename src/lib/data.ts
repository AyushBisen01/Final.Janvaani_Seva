
'use server';

import type { Issue, User } from './types';
import dbConnect from '@/lib/db';
import IssueModel from '@/lib/models/Issue';
import UserModel from '@/lib/models/User';
import FlagModel from '@/lib/models/Flag';
import {_getUsers, _getIssues} from '@/lib/placeholder-data'
import mongoose from 'mongoose';

// Helper to capitalize first letter
const capitalize = (s: string) => s && s.charAt(0).toUpperCase() + s.slice(1);

// Functions to interact with the real database
export async function getIssues(): Promise<Issue[]> {
  const placeholderIssues = _getIssues();
  try {
    await dbConnect();
    
    const realIssues = await IssueModel.aggregate([
      {
        $lookup: {
          from: 'users', // The collection name for UserModel
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: {
          path: '$user',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'flags', // The collection name for FlagModel
          let: { issue_id: "$_id" },
          pipeline: [
            { $match: 
              { $expr: 
                { $and: [
                  { $eq: ["$issueId", "$$issue_id"] },
                  { $eq: ["$type", "red"] }
                ]}
              }
            },
            {
              $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'flagger'
              }
            },
            { $unwind: '$flagger' }
          ],
          as: 'red_flags_with_reasons'
        }
      },
      {
        $addFields: {
          redFlagReasons: {
            $map: {
              input: '$red_flags_with_reasons',
              as: 'redFlag',
              in: {
                reason: '$$redFlag.reason',
                user: '$$redFlag.flagger.name'
              }
            }
          }
        }
      },
      {
        $sort: { createdAt: -1 }
      }
    ]);

    const mappedIssues = realIssues.map((issue) => {
      const issueIdString = issue._id.toString();
      
      let status = capitalize(issue.status || 'Pending');
       if (issue.status === 'inProgress' || issue.status === 'inprogress') {
        status = 'inProgress';
      }
       if (issue.status === 'approved') {
        status = 'Approved';
      }

      return {
        id: issueIdString,
        category: issue.title,
        description: issue.description,
        location: {
          address: issue.location,
          lat: issue.coordinates?.latitude || 0,
          lng: issue.coordinates?.longitude || 0,
        },
        status: status as any,
        priority: issue.priority || 'Medium',
        reportedAt: issue.createdAt,
        resolvedAt: issue.resolvedAt,
        assignedTo: issue.assignedTo,
        citizen: {
          name: issue.user?.name || issue.submittedBy || 'Unknown',
          contact: issue.user?.email || 'N/A',
        },
        imageUrl: issue.imageUrl || '',
        imageHint: issue.title,
        proofUrl: issue.proofUrl,
        proofHint: issue.proofHint,
        greenFlags: issue.greenFlags || 0,
        redFlags: issue.redFlags || 0,
        redFlagReasons: issue.redFlagReasons?.filter((r: any) => r.reason) || [],
        statusHistory: issue.statusHistory && issue.statusHistory.length > 0 
          ? issue.statusHistory.map(h => ({ status: capitalize(h.status), date: h.date }))
          : [{ status: capitalize(issue.status || 'Pending'), date: issue.createdAt }]
      };
    });
    
    // Combine real and placeholder data, ensuring no duplicates
    const realIssueIds = new Set(mappedIssues.map(i => i.id));
    const uniquePlaceholderIssues = placeholderIssues.filter(p => !realIssueIds.has(p.id));
    
    return [...mappedIssues, ...uniquePlaceholderIssues];

  } catch (error) {
    console.error("Error fetching issues from DB, returning only placeholder data:", error);
    return placeholderIssues;
  }
}

export async function getUsers(): Promise<User[]> {
   const placeholderUsers = _getUsers();
   try {
    await dbConnect();
    const realUsers = await UserModel.find({}).lean();

    const mappedUsers = realUsers.map(user => ({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role || 'Citizen',
      avatarUrl: user.faceImageUrl || `https://i.pravatar.cc/150?u=${user.email}`,
      department: user.department,
    }));
    
    // Combine real and placeholder data, ensuring no duplicates
    const realUserEmails = new Set(mappedUsers.map(u => u.email));
    const uniquePlaceholderUsers = placeholderUsers.filter(p => !realUserEmails.has(p.email));

    return [...mappedUsers, ...uniquePlaceholderUsers];

  } catch (error) {
    console.error("Error fetching users from DB, returning only placeholder data:", error);
    return placeholderUsers;
  }
}

export async function updateIssue(id: string, updates: Partial<Issue>) {
    try {
        await dbConnect();
        const issueToUpdate = await IssueModel.findById(id);

        if (!issueToUpdate) {
            console.warn(`Issue with id ${id} not found in DB, cannot update.`);
            return;
        }
        
        const updateOp: any = { $set: {} };
        
        if (updates.status) {
            let newStatus = updates.status.toLowerCase();
            const currentStatus = (issueToUpdate.status || 'Pending').toLowerCase();

            if (newStatus !== currentStatus) {
                updateOp.$set.status = newStatus;
                updateOp.$push = { statusHistory: { status: newStatus, date: new Date() } };
            }
        }
        
        if (updates.assignedTo) {
            updateOp.$set.assignedTo = updates.assignedTo;
        }
        if (updates.priority) {
            updateOp.$set.priority = updates.priority;
        }
        
        if (Object.keys(updateOp.$set).length > 0) {
            await IssueModel.findByIdAndUpdate(id, updateOp, { new: true, upsert: false }).lean();
        }

    } catch (error) {
        console.error(`Failed to update issue ${id} in DB:`, error);
        throw error;
    }
}

export async function updateMultipleIssues(updates: (Partial<Issue> & {id: string})[]) {
    try {
        await dbConnect();
        if (updates.length === 0) return;

        const bulkOps = updates.map(update => {
            const { id, ...updateData } = update;
            
            const setOp: any = {};
            const pushOp: any = {};
            
            if (updateData.status) {
                let newStatus = updateData.status.toLowerCase();
                 setOp.status = newStatus;
                 pushOp.statusHistory = { status: newStatus, date: new Date() };
            }
             if (updateData.priority) setOp.priority = updateData.priority;
             if (updateData.assignedTo) setOp.assignedTo = updateData.assignedTo;

            const finalUpdate: any = {};
            if(Object.keys(setOp).length > 0) finalUpdate.$set = setOp;
            if(Object.keys(pushOp).length > 0) finalUpdate.$push = pushOp;

            return {
                updateOne: {
                    filter: { _id: id },
                    update: finalUpdate
                }
            };
        });
        
        const validBulkOps = bulkOps.filter(op => op.updateOne.update.$set || op.updateOne.update.$push);

        if (validBulkOps.length > 0) {
            await IssueModel.bulkWrite(validBulkOps);
        }

    } catch (error) {
        console.error('Failed to bulk update issues in DB:', error);
        throw error;
    }
}
