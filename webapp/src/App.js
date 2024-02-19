import React, { useState, useEffect } from 'react';
import Map from './components/map.js';
import CardCitta from "./components/cardCitta";
import CardAlbero from "./components/cardAlbero";
import CardCirc from "./components/cardCirc";
import CardPoli from "./components/cardPoli";
import CardPoligono from "./components/cardPoligono"
import './App.css';
import { Button, Link } from "@mui/material";
import {
  fetchProps
} from "./data/mapFunctions"
import { Drawer } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

import SweetAlert2 from 'react-sweetalert2';

import pointsWithinPolygon from '@turf/points-within-polygon'

import { BsFillArrowRightSquareFill } from 'react-icons/bs'
import { AiFillGithub } from 'react-icons/ai'
import { IoIosPeople } from 'react-icons/io'
import { MdEmail } from 'react-icons/md'

import { CircleLoading } from 'react-loadingg';


function App() {
  const [cardInfo, setCardInfo] = useState({
    name: 'citta',
    item_name: null,
    item_info: null
  })

  const [data, setData] = useState({
    propTrees: null,
    propCircoscrizioni: null,
    propPoliSociali: null,
    propPredictions: null,
    totalInfoTrees: null
  })

  const [swalProps, setSwalProps] = useState({});
  const [drawerOpen, setDrawer] = useState(true)


  useEffect(() => {
    //aspetto che vengano fetchati tutti i geojson necessari e li salvo nello stato (solo primo ciclo)
    fetchProps().then((data) => {
      let tempTrees = data[0]
      let total = tempTrees.features.pop()

      let date = Date.now()

      /* data[1].features.map((item) => {
        return item.properties.trees_within = pointsWithinPolygon(tempTrees, item).features.length
      })

      data[2].features.map((item) => {
        return item.properties.trees_within = pointsWithinPolygon(tempTrees, item).features.length
      }) */

      let finishDate = Date.now()

      console.log('finished processing poli and circ data in ' + (finishDate - date) / 1000 + ' seconds') 

      setData({
        propTrees: data[0],
        propCircoscrizioni: data[1],
        propPoliSociali: data[2],
        propPredictions: data[3],
        totalInfoTrees: total.properties
      })
    })
  }, [])

  //fuinzione passata al componente figlio 'map', che cambia lo stato di app (questo component), che permette di capire quale layer si e' cliccato e le sue informazioni, e di conseguenza estrarne le informazioni. 
  function changeCardInfo(info) {
    setCardInfo(info)
  }

  const onClick = () => {
    setDrawer(!drawerOpen)
  }

  function showAbout() {
    setSwalProps({
      show: true,
      didClose: () => {
        setSwalProps({})
      }
    });
  }


  if (data.propTrees === null) {
    return (
      <div style={{ textAlign: 'center', position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
        <CircleLoading />
        <Typography sx={{ textAlign: 'center', fontSize: 17, marginTop: 10 }} color="text.secondary">
          The page is loading...
        </Typography>
      </div>
    )
  } else {
    return (
      <React.Fragment>
        <Drawer
          anchor='left'
          open={drawerOpen}
          // overflowY= 'scroll'
          sx={{
            position: "relative",
            zIndex: 'initial',
            overflowY: 'auto',
            boxSizing: 'content-box',
            '& .MuiDrawer-paper': {
              scrollBehavior: 'smooth',
              scrollbarWidth: 'none',
              backgroundColor: '#fff0',
              boxShadow: 'none',
              //height: 'auto',
            },
          }}
        >
          {data.propTrees !== null && (
            cardInfo.name === 'citta' ? <CardCitta drawerOpen={drawerOpen} setDrawerOpen={setDrawer} propTrees={data.propTrees} totalInfo={data.totalInfoTrees} /> :
              cardInfo.name === 'poli' ? <CardPoli drawerOpen={drawerOpen} setDrawerOpen={setDrawer} name={cardInfo.item_name} propTrees={data.propTrees} propPoliSociali={data.propPoliSociali} /> :
                cardInfo.name === 'circoscrizioni' ? <CardCirc drawerOpen={drawerOpen} setDrawerOpen={setDrawer} name={cardInfo.item_name} propTrees={data.propTrees} propCircoscrizioni={data.propCircoscrizioni} /> :
                  cardInfo.name === 'albero' ? <CardAlbero drawerOpen={drawerOpen} setDrawerOpen={setDrawer} name={cardInfo.item_info.Name} propTree={cardInfo.item_info} /> :
                    cardInfo.name === 'poligono' ? <CardPoligono drawerOpen={drawerOpen} setDrawerOpen={setDrawer} info_poligono={cardInfo.item_info.features[0]} propTrees={data.propTrees} /> : null
          )
          }
        </Drawer>
        
        <Map setDrawer={setDrawer} setCardInfo={changeCardInfo} propTrees={data.propTrees} propCircoscrizioni={data.propCircoscrizioni} propPoliSociali={data.propPoliSociali} propPredictions={data.propPredictions} />

        {drawerOpen ? null :
          <div style={{
            position: "absolute",
            left: 0,
            top: 0,
            margin: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <BsFillArrowRightSquareFill onClick={onClick} size={30} />
            <Typography sx={{ textAlign: 'center', fontSize: 17, fontWeight: 'bold' }} color="text.primary">
              Info
            </Typography>
          </div>
        }
        <Button variant="contained" onClick={showAbout} startIcon={<IoIosPeople />}
          sx={{
            position: "absolute",
            backgroundColor: '#42dd57b8',
            "&:hover": {
              backgroundColor: "#30db47e6",
            },
            right: 0,
            bottom: 0,
            margin: 1.5,
          }}
        >
          About
        </Button>
        <SweetAlert2 {...swalProps}>
          <Typography variant='h5'>
            Tree Map of Bologna
          </Typography>
          <Divider flexItem sx={{ marginTop: 1 }} />
          <Typography fontSize={14} marginTop={1}>
            The map shows a part of the trees managed by the Municipality of Bologna.
          </Typography>
          <Typography fontSize={14} marginTop={1}>
            The data are taken from the open data portal of the Municipality of Bologna and are updated to 2023.
          </Typography>
          <Typography fontSize={14} marginTop={1}>
            The Eco-Benefit is calculated using the platform
          </Typography>
          <Typography fontSize={14} marginTop={1} color={'red'}>
            Red dots are rappresenting the proposed trees to be planted and the potential ecobenefit that they could bring.
          </Typography>
          <Typography fontSize={16} fontWeight="bold">
            <Link target="_blank" href="https://www.itreetools.org/tools/i-tree-eco" underline="hover">
              i-Tree Eco
            </Link>
          </Typography>
          <Typography fontSize={14} marginTop={1}>
            The map was created by
          </Typography>
          <Typography fontSize={18} fontWeight="bold" color='#0bff2a'>
            Luca Maccacaro
          </Typography>
          <Typography fontSize={14}>
            under the supervision of&nbsp;
            <Link target="_blank" href="https://twitter.com/napo" underline="hover">
              Maurizio Napolitano
            </Link>
            &nbsp; during the thesis project at&nbsp;
            <Link target="_blank" href="https://www.unitn.it/" underline="hover">
              Univestità degli Studi di Trento
            </Link>
            .
          </Typography>
          <Typography fontSize={14} marginTop={2}>
            For details and contacts:
          </Typography>
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
          >
            <Grid item sx={{ marginTop: 1 }}>
              <Grid
                container
                display='flex'
                direction="row"
                justifyContent="center"
                alignItems="stretch"
              >
                <Grid item >
                  <div style={{
                    position: "relative",
                    left: 0,
                    top: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <AiFillGithub size={25} />
                    <Typography sx={{ textAlign: 'center', fontSize: 13 }} color="text.secondary">
                      Github
                    </Typography>
                    <Typography sx={{ fontSize: 15, textAlign: 'center' }}>
                      <Link target="_blank" href="https://github.com/DigitalCommonsLab/greenergroundsplanning">
                        Repository
                      </Link>
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Divider flexItem sx={{ marginTop: 1, marginRight: 10, marginLeft: 10 }} />
            <Grid item sx={{ marginTop: 1 }}>
              <div style={{
                position: "relative",
                left: 0,
                top: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <MdEmail size={25} />
                <Typography sx={{ textAlign: 'center', fontSize: 13 }} color="text.secondary">
                  E-Mail
                </Typography>
                <Typography sx={{ fontSize: 16, textAlign: 'center' }}>
                  <Link target="_blank" href="mailto:luca.maccacaro@studenti.unitn.it">
                    luca.maccacaro@studenti.unitn.it
                  </Link>
                </Typography>
              </div>
            </Grid>
          </Grid>
          <Typography fontSize={14} marginTop={1}>
            This software is released under the MIT license.
          </Typography>
        </SweetAlert2>
      </React.Fragment>
    )
  }
}

export default App;