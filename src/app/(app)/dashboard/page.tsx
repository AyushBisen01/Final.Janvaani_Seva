
'use client';
import * as React from 'react';

import { StatCard } from '@/components/dashboard/stat-card';
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  ListChecks,
} from 'lucide-react';
import { IssuesByCategoryChart } from '@/components/dashboard/issues-by-category-chart';
import { RecentIssues } from '@/components/dashboard/recent-issues';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapProvider } from '@/components/map/map-provider';
import { IssueMapOverview } from '@/components/dashboard/issue-map-overview';
import { AppContext } from '../layout';


export default function DashboardPage() {
    const context = React.useContext(AppContext);

    if (!context) {
        return null;
    }

    const { issues } = context;

  const totalIssues = issues.length;
  const newIssues = issues.filter(
    (i) => i.status === 'Pending' || i.status === 'Approved'
  ).length;
  const resolvedIssues = issues.filter((i) => i.status === 'Resolved').length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Issues"
          value={totalIssues}
          icon={ListChecks}
        />
        <StatCard
          title="New/Pending"
          value={newIssues}
          icon={AlertTriangle}
          color="text-yellow-500"
        />
        <StatCard
          title="Resolved"
          value={resolvedIssues}
          icon={CheckCircle}
          color="text-green-500"
        />
        <StatCard
          title="Avg. Resolution Time"
          value="3.2 Days"
          icon={Clock}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <Activity />
              Issues by Category
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <IssuesByCategoryChart issues={issues} />
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline">Recent Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentIssues issues={issues} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Issue Hotspots</CardTitle>
        </CardHeader>
        <CardContent>
          <MapProvider>
            <IssueMapOverview issues={issues}/>
          </MapProvider>
        </CardContent>
      </Card>
    </div>
  );
}
