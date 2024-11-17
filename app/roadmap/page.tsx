'use client'

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface RoadmapItem {
    title: string;
    description: string;
    status: 'completed' | 'in-progress' | 'planned';
}

const initialRoadmap: RoadmapItem[] = [
    {
        title: 'dialect notifications',
        description: 'create a dialect notifications for documents created and signed.',
        status: 'completed',
    },
    {
        title: 'onchain settlement',
        description: 'write a multisigsettlement contract onchain.',
        status: 'in-progress',
    },
    {
        title: 'arweave storage',
        description: 'store documents on decentralized storage.',
        status: 'planned',
    },
    {
        title: 'tiplink authentication + sphere for payments',
        description: 'add tiplink gmail auth and sphere for monthly payments.',
        status: 'planned',
    },
];

const RoadmapPage = () => {
    const [roadmap] = useState<RoadmapItem[]>(initialRoadmap);

    const getStatusStyles = (status: RoadmapItem['status']) => {
        switch (status) {
            case 'completed':
                return 'bg-green-500';
            case 'in-progress':
                return 'bg-yellow-400';
            case 'planned':
                return 'bg-gray-600';
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen mx-auto mt-24">
            <Card className="w-full max-w-4xl">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center leading-tight tracking-tighter">
                        project roadmap
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {roadmap.map((item, index) => (
                        <Card key={index}>
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between mb-2">
                                    <h2 className="text-xl font-semibold">{item.title}</h2>
                                    <Badge className={cn(
                                        getStatusStyles(item.status)
                                    )}>
                                        {item.status}
                                    </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {item.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
};

export default RoadmapPage;
