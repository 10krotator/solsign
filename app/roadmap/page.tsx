'use client'

import { useState } from 'react';

import { Badge } from '@/components/ui/badge';

interface RoadmapItem {
    title: string;
    description: string;
    status: 'completed' | 'in-progress' | 'planned';
}

const initialRoadmap: RoadmapItem[] = [
    {
        title: 'consultant lawyer gpt',
        description: 'consultant lawyer gpt for legal advice on uploaded contracts.',
        status: 'in-progress',
    },
    {
        title: 'onchain settlement',
        description: 'write a multisigsettlement contract onchain.',
        status: 'planned',
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

    const getStatusColor = (status: RoadmapItem['status']) => {
        switch (status) {
            case 'completed':
                return 'bg-green-500';
            case 'in-progress':
                return 'bg-yellow-500';
            case 'planned':
                return 'bg-gray-500';
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-full max-w-4xl bg-muted rounded-lg shadow-md p-8">
                <h1 className="text-3xl font-bold leading-tight tracking-tighter mb-6 text-center">project roadmap</h1>
                <div className="space-y-6">
                    {roadmap.map((item, index) => (
                        <div key={index} className="bg-background p-4 rounded-lg shadow">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-xl font-semibold">{item.title}</h2>
                                <Badge className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(item.status)}`}>
                                    {item.status}
                                </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RoadmapPage;
