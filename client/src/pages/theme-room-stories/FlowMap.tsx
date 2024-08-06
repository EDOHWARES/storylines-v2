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
import LoadingScreen from '../../components/layout/LoadingScreen';

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
    const [isLoading, setIsLoading] = useState<boolean>(true);

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
        const levelWidth: { [key: number]: number } = {};
        const nodeWidth = 150;
        const nodeHeight = 40;
        const verticalSpacing = 100;

        const createNode = (story: Story, depth: number, index: number): Node => {
            const horizontalSpacing = screenSize.width / (levelWidth[depth] + 1);
            return {
                id: story._id,
                position: {
                    x: (index + 1) * horizontalSpacing - nodeWidth / 2,
                    y: depth * verticalSpacing
                },
                data: { label: story.title },
                style: { width: nodeWidth, height: nodeHeight }
            };
        };

        const processLevel = (levelNodes: Story[], depth: number) => {
            const nextLevelNodes: Story[] = [];
            levelWidth[depth] = levelNodes.length;

            levelNodes.forEach((story, index) => {
                if (nodeMap.has(story._id)) return;

                const node = createNode(story, depth, index);
                newNodes.push(node);
                nodeMap.set(story._id, node);

                story.next.forEach(nextId => {
                    const nextStory = stories.find(s => s._id === nextId);
                    if (nextStory) {
                        nextLevelNodes.push(nextStory);
                        newEdges.push({
                            id: `e${story._id}-${nextId}`,
                            source: story._id,
                            target: nextId
                        });
                    }
                });
            });

            if (nextLevelNodes.length > 0) {
                processLevel(nextLevelNodes, depth + 1);
            }
        };

        processLevel([rootNode], 0);

        setNodes(newNodes);
        setEdges(newEdges);
    };

    useEffect(() => {
        const setupFlowMap = async () => {
            setIsLoading(true);
            constructNodesAndEdges();

            const clickFitViewButton = () => {
                const fitViewButton = document.querySelector('.react-flow__controls-fitview') as HTMLButtonElement;
                if (fitViewButton) {
                    fitViewButton.click();
                }
            };

            // Wait for the next frame to ensure the DOM has updated
            await new Promise(resolve => requestAnimationFrame(resolve));

            clickFitViewButton();
            setIsLoading(false);
        };

        setupFlowMap();
    }, [stories, screenSize]);

    if (isLoading) {
        return <LoadingScreen />;
    }

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