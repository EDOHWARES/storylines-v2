"use client";
import React, { useState, useEffect } from 'react';
import {
    ReactFlow,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    Node,
    Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

interface Story {
    _id: string;
    title: string;
    type: string;
    content: string;
    next: string[];
}

interface FlowMapProps {
    stories: Story[];
}

const FlowMap: React.FC<FlowMapProps> = ({ stories }) => {
    const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

    useEffect(() => {
        const updateScreenSize = () => {
            setScreenSize({ width: window.innerWidth, height: window.innerHeight });
        };

        updateScreenSize();
        window.addEventListener('resize', updateScreenSize);

        return () => window.removeEventListener('resize', updateScreenSize);
    }, []);

    const constructNodesAndEdges = () => {
        const newNodes: Node[] = [];
        const newEdges: Edge[] = [];
        const rootNode = stories.find(story => story.type === "root");

        if (!rootNode) return;

        const nodeMap = new Map<string, Node>();

        const createNode = (story: Story, depth: number, index: number): Node => {
            const nodeWidth = 150;
            const nodeHeight = 40;
            const horizontalSpacing = 200;
            const verticalSpacing = 100;

            return {
                id: story._id,
                position: {
                    x: depth * horizontalSpacing,
                    y: index * verticalSpacing
                },
                data: { label: story.title },
                style: { width: nodeWidth, height: nodeHeight }
            };
        };

        const processNode = (story: Story, depth: number, index: number) => {
            if (nodeMap.has(story._id)) return;

            const node = createNode(story, depth, index);
            newNodes.push(node);
            nodeMap.set(story._id, node);

            story.next.forEach((nextId, i) => {
                const nextStory = stories.find(s => s._id === nextId);
                if (nextStory) {
                    processNode(nextStory, depth + 1, index + i);
                    newEdges.push({
                        id: `e${story._id}-${nextId}`,
                        source: story._id,
                        target: nextId
                    });
                }
            });
        };

        processNode(rootNode, screenSize.width / 2, screenSize.height / 4);

        setNodes(newNodes);
        setEdges(newEdges);
    };

    console.log(`Width: ${screenSize.width/2}`);
    console.log(`Height: ${screenSize.height/4}`)

    useEffect(() => {
        const updateScreenSize = () => {
            setScreenSize({ width: window.innerWidth, height: window.innerHeight });
        };

        updateScreenSize();
        window.addEventListener('resize', updateScreenSize);

        return () => window.removeEventListener('resize', updateScreenSize);
    }, []);

    useEffect(() => {
        constructNodesAndEdges();
    }, [stories, screenSize]);

    return (
        <div style={{width: `${screenSize.width}px`, height: `${screenSize.height}px`}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
            >
                <Controls />
                <Background gap={12} size={1} />
            </ReactFlow>
        </div>
    );
};

export default FlowMap;