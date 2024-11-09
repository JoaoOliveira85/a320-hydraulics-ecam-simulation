import React from 'react';
import { Box, Button, Typography, Paper, Grid } from '@mui/material';
import { Colors, Pumps, TypesOfPumps, TypesOfValves, Valves } from 'types';

interface FailureControlsProps {
    onTriggerPumpFailure: (pump: TypesOfPumps) => void;
    onTriggerValveFailure: (valve: TypesOfValves) => void;
    onTriggerLineLeak: (line: Colors) => void;
}

type Failure = {
    title: string,
    action: string,
    items: { label: string, id: Partial<TypesOfPumps> | TypesOfValves | Colors }[]
}

const failureConfig: Failure[] = [
    {
        title: 'Pump Failures',
        action: 'onTriggerPumpFailure',
        items: [
            { label: 'Eng 1', id: Pumps.engine1 },
            { label: 'Eng 2', id: Pumps.engine2 },
            { label: 'Eng 3', id: Pumps.blueElectricPump },
        ],
    },
    {
        title: 'Valve Failures',
        action: 'onTriggerValveFailure',
        items: [
            { label: 'Eng 1', id: Valves.engine1 },
            { label: 'Eng 2', id: Valves.engine2 },
        ],
    },
    {
        title: 'Line Leaks',
        action: 'onTriggerLineLeak',
        items: [
            { label: 'Green', id: Colors.green },
            { label: 'Yellow', id: Colors.yellow },
            { label: 'Blue', id: Colors.blue },
        ],
    },
];

export const FailureControls: React.FC<FailureControlsProps> = ({
    onTriggerPumpFailure,
    onTriggerValveFailure,
    onTriggerLineLeak,
}) => {
    const renderFailureButtons = ({
        title,
        action,
        items,
    }: Failure) => (
        <Grid item xs={12} key={title}>
            <Typography variant="subtitle2" align="center">{title}</Typography>
            <Box display="flex" justifyContent="center" gap={1}>
                {items.map((item) => (
                    <Button
                        key={item.id}
                        variant="contained"
                        color={'error'}
                        size="small"
                        onClick={() => {
                            if (action === 'onTriggerPumpFailure') onTriggerPumpFailure(item.id as Pumps);
                            if (action === 'onTriggerValveFailure') onTriggerValveFailure(item.id as Valves);
                            if (action === 'onTriggerLineLeak') onTriggerLineLeak(item.id as Colors);
                        }}
                    >
                        {item.label}
                    </Button>
                ))}
            </Box>
        </Grid>
    );

    return (
        <Paper sx={{ padding: 2, margin: 2 }}>
            <Typography variant="h6" align="center" sx={{ mb: 2 }}>
                Trigger Failures
            </Typography>
            <Grid container spacing={1}>
                {failureConfig.map((config) =>
                    renderFailureButtons({title: config.title, action: config.action, items: config.items})
                )}
            </Grid>
        </Paper>
    );
};
