import React, { useRef, useEffect, useState } from 'react';
import '../App.css';
import BenefitGrid from './benefitGrid'
import {
    speciesFreq,
    mostCommonSpecies,
    composeChart
} from '../data/cardFunctions'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs'


export default function CardCitta(props) {
    var [treesNum, setTreesNum] = useState('')
    var [freq, setFreq] = useState('')
    var [commonSpecies, setcommonSpecies] = useState('')
    var [grid, setGrid] = useState('')
    var [benefitsCityGrid, setbenefitsCityGrid] = useState('')
    var [chart, setChart] = useState('')

    useEffect(() => {
        if (treesNum == '' && freq == '' && commonSpecies == '') {
            let freq = speciesFreq(props.propTrees.features)
            let commonSpecies = mostCommonSpecies(freq)

            let chartData = []

            commonSpecies.map((specie) => {
                chartData.push({
                    name: specie,
                    amount: parseInt(freq[specie])
                })
            })

            setChart(composeChart(chartData, (((Object.keys(props.propTrees.features)).length) - 1), Object.keys(freq).length))

            setTreesNum((Object.keys(props.propTrees.features)).length)
            setFreq(freq)
            setcommonSpecies(commonSpecies)

            let key = 0
            for (key in props.totalInfo) {
                props.totalInfo[key] = parseFloat(props.totalInfo[key])
            }

            setbenefitsCityGrid(
                <BenefitGrid totalInfo={props.totalInfo} />
            )
        }
    }, [])

    return (
        // <ThemeProvider theme={theme}>
        <Box sx={{ minWidth: 10 }} className="card">
            <Card variant="outlined" sx={{ borderRadius: 5, backgroundColor: '#ffffffd0' }}>
                <CardContent >
                    <Grid
                        container
                        direction="column"
                        justifyContent="flex-start"
                    >
                        <Grid item xs='auto'>
                            {props.drawerOpen ?
                                <div style={{
                                    position: "relative",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}>
                                    <BsFillArrowLeftSquareFill onClick={() => props.setDrawerOpen(false)} size={25} />
                                </div> : null
                            }
                        </Grid>
                        <Grid item xs='auto'>
                            <Typography sx={{ fontSize: 25, textAlign: 'center', color: '#1fe54d', fontWeight: 'bold' }}>
                                City of Bologna
                            </Typography>
                            <Typography sx={{ textAlign: 'center', fontSize: 15 }} color="text.secondary">
                                Total trees in management
                            </Typography>
                            <Typography sx={{ fontSize: 23, textAlign: 'center', fontWeight: 'bold' }}>
                                {treesNum - 1}
                            </Typography>
                            <Typography sx={{ textAlign: 'center', fontSize: 15 }} color="red">
                                Predicted benefit for the city, gained by the new trees:
                            </Typography>
                            <Typography sx={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }} color="red">
                                {/* TODO: make this dynamic */}
                                69.83 €/year
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Card variant="outlined" sx={{ borderRadius: 5, backgroundColor: '#ffffffd0', marginTop: 1 }}>
                <CardContent >
                    {benefitsCityGrid}
                </CardContent>
            </Card>
            <Card variant="outlined" sx={{ borderRadius: 5, backgroundColor: '#ffffffd0', marginTop: 1 }}>
                <CardContent >
                    {chart}
                </CardContent>
            </Card>
        </Box>
        // </ThemeProvider>
    );
}