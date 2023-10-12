import { useRef, useEffect, useState } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import '../App.css';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Grid from '@mui/material/Grid';
import {
    getTreesWithinCircoscrizione,
    getTotalInfoFromTrees,
    speciesFreq,
    mostCommonSpecies,
    composeChart
} from '../data/cardFunctions'
import BenefitGrid from './benefitGrid'
import { BsFillArrowLeftSquareFill } from 'react-icons/bs'

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

const theme = createTheme({
    palette: {
        mode: "light",
        background: {
            default: "green"
        }
    }
});

export default function CardCirc(props) {
    const [filterValue, setFilterValue] = useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setFilterValue(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    var [treesCirc, setTreesCirc] = useState('')
    var [totalInfoTrees, setTotalInfoTrees] = useState(null);
    var [freq, setFreq] = useState('')
    var [commonSpecies, setcommonSpecies] = useState('')
    var [chart, setChart] = useState('')

    useEffect(() => {
        let treesInCirc = getTreesWithinCircoscrizione(props.propTrees, props.name, props.propCircoscrizioni).features
        let freq = speciesFreq(treesInCirc)
        let commonSpecies = mostCommonSpecies(freq)

        if (filterValue.length > 0) {
            treesInCirc = treesInCirc.filter((tree) => {
                // check if the tree is in one of the selected species
                return filterValue.includes(tree.properties.Name)
            })
        }
        let totalInfo = getTotalInfoFromTrees(treesInCirc)

        let chartData = []

        commonSpecies.map((specie) => {
            chartData.push({
                name: specie,
                amount: parseInt(freq[specie])
            })
        })

        setChart(composeChart(chartData, (((Object.keys(treesInCirc)).length) - 1), Object.keys(freq).length))

        setFreq(freq)
        setcommonSpecies(commonSpecies)
        setTreesCirc(treesInCirc)
        setTotalInfoTrees(totalInfo)
    }, [filterValue])

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
                            <Typography sx={{ textAlign: 'center', fontSize: 15 }} color="text.secondary">
                                Zone
                            </Typography>
                            <Typography sx={{ fontSize: 25, textAlign: 'center', color: '#1fe54d', fontWeight: 'bold' }}>
                                {props.name}
                            </Typography>
                            <Typography sx={{ textAlign: 'center', fontSize: 15 }} color="text.secondary">
                                Trees
                            </Typography>
                            <Typography sx={{ fontSize: 23, textAlign: 'center', fontWeight: 'bold' }}>
                                {treesCirc.length}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Card variant="outlined" sx={{ borderRadius: 5, backgroundColor: '#ffffffd0', marginTop: 1 }}>
                <CardContent >
                    {totalInfoTrees != null ? <BenefitGrid totalInfo={totalInfoTrees} /> : null}
                </CardContent>
            </Card>
            <Card variant="outlined" sx={{ borderRadius: 5, backgroundColor: '#ffffffd0', marginTop: 1 }}>
                <CardContent >
                    {chart}
                </CardContent>
            </Card>
            {commonSpecies?.length > 0 && (
                <Card variant="outlined" sx={{ borderRadius: 5, backgroundColor: '#ffffffd0', marginTop: 1 }}>
                    {/* add the filters, for the species */}
                    <Typography sx={{ textAlign: 'center', fontSize: 15, marginTop: 1 }} color="text.secondary">
                        Select the species you want to see:
                    </Typography>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={filterValue}
                            onChange={handleChange}
                            input={<OutlinedInput label="Tag" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {commonSpecies?.map((name) => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox checked={filterValue.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Card>
            )}
        </Box>
    );
}