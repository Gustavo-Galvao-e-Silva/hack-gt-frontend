"use client"
import { useState, useEffect } from 'react';
import MyGraph from "@/components/graph";

export default function Graph({ params }) {
    const { workspaceId } = params;
    const [graphData, setGraphData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGraphData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:8000/nodes/${workspaceId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch graph data');
                }
                const data = await response.json();
                setGraphData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGraphData();
    }, [workspaceId]);

    if (loading) return <div>Loading graph...</div>;
    if (error) return <div>Error: {error}</div>;

    return <MyGraph graphData={graphData} />;
}