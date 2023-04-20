# Greener Grounds Planning - Project description

## Table of Contents

* [Introduction](#introduction)
* [Datasets](#datasets)
* [Methodology](#methodology)
* [Documentation](#documentation)
* [Code](#code)
* [Conclusions](#conclusions)

The aim of this document is to elucidate the scope of research covered by the project and retrieve the primary documentation employed for the code's methodologies and overall starting decisions.

## Introduction <a name="introduction"></a>

Forests and trees provide a range of ecosystem services that are essential for human well-being, including improving air and water quality, reducing the risk of natural disasters, and regulating local climate. However, with the increasing urbanization and expansion of cities, many people are now living in areas where green spaces are limited or nonexistent, leading to negative impacts on mental and physical health. In response, this research project aims to investigate the extent to which trees contribute to human well-being in the world's megacities, where humans are most concentrated and nature is often far removed. Specifically, we aim to calculate the additional number of trees that could be planted in each megacity to enhance the quality of life for residents. By understanding the benefits of trees in urban areas, this study seeks to inform policy and planning decisions that will promote sustainable urban development and improve the health and well-being of city dwellers.


## Datasets <a name="datasets"></a>

MaTREEd is developed using the following datasets:

* **[trees in Bologna](https://opendata.comune.bologna.it/explore/dataset/alberi-manutenzioni/table/?disjunctive.classe&disjunctive.cl_h&disjunctive.dimora&disjunctive.d_edif)**


## Methodology <a name="methodology"></a>

## Initial documentation <a name="documentation"></a>

### Ecobenefit calculation

- Source: The value of urban trees: enviromental factors and economic efficiency
  - Description: The author argues that trees hold a special place in humanity's emotional intelligence, similar to that of pandas as a symbol of endangered species. Trees occupy the same niche as pandas in the kingdom of flora, and the Kyoto Protocol and its successors are likely to reinforce this view.
  - URL: [page](https://treenet.org/wp-content/uploads/2021/10/2009-the-value-of-urban-trees-environmental-factors-and-economic-efficiency-mark-brindal-prof-randy-stringer.pdf)
  - Best idea: Bring data and brief calculation but quite old (2009)

- Source: The Social and Economic Values of Canada’s Urban Forests: A National Synthesis
  - Description: The purpose of this report is to summarize the contribution of urban forests to the Canadian economy and society. It presents a review and synthesis of relevant and accessible research on valuing the various benefits of urban forests.
  - URL: [page](https://urbanforestry.sites.olt.ubc.ca/files/2016/09/The-Social-and-Economic-Values-of-Canada’s-Urban-Forests-A-National-Synthesis-2015.pdf)
  - Best idea: (use I-tree)

- Source: Urban forest structure, ecosystem services and change in Syracuse, NY
  - Description: The tree population within the City of Syracuse was assessed using a random sampling of plots in 1999, 2001 and 2009 to determine how the population and the ecosystem services these trees provide have changed over time. Ecosystem services and values for carbon sequestration, air pollution removal and changes in building energy use were derived using the i-Tree Eco model
  - URL: [page](https://www.researchgate.net/publication/257671000_Urban_forest_structure_ecosystem_services_and_change_in_Syracuse_NY)
  - Best idea: Shows methodology and plots, is old and use I-tree methods

### Technical

- Source: OpenTreeMap/ otm-python-eco
  - Description: Generally you need a region code, species code, and factor type. You can also use some convenience functions to get around factor type all together.
  - URL: [page](https://github.com/OpenTreeMap/otm-python-eco)
  - Best idea: Python library to calculate ecobenefit based on region code, species code, and factor type.

- Source: GISdevio/ MaTREEd
  - Description: To answer the objectives of the GREEMTA challenge, MaTREEd offers a prototype of a Tree Information System for Madrid neighborhoods which helps city administrators take informed decisions on urban tree management to mitigate the impact of climate change and facilitate transition towards a greener and more sustainable urban environment.
  - URL: [page](https://github.com/GISdevio/MaTREEd)
  - Best idea: Code and methodology

- Source: Urban Forestry Science - How to select optimal location for future tree canopy in Madrid
  - Description: The proposal firstly identifies neighboorhoods in Madrid with the highest environmental discomfort (high particulate matter, temperature, carbon monoxide, noise pollution, etc..). Based on the mentioned metrics, it is determined a disadvantaged district and conducted a further analysis to select optimal locations for planting trees. The final goal is to provide Madrid municipality with granular metrics to evaluate the tree canopy impact on a long-term strategy.
  - URL: [page](https://storymaps.arcgis.com/stories/708e395ca43a4da491afaf5fa1462d30)
  - Best idea: Code and methodology
  
- Source: i-Tree: Tree Benefits
  - Description: i-Tree is a collection of urban and rural forestry analysis and benefits assessment tools. It was designed and developed by the United States Forest Service to quantify and value ecosystem services.
  - URL: [page](https://www.itreetools.org)
  - Best idea: Methodology, to be reviewed
  

### Tree choice

- Source: How to select the best tree planting locations to enhance air pollution removal in the MillionTreesNYC initiative
  - Description: Highest priority zones for tree planting within New York City were selected by using a planting priority index developed combining three main indicators: pollution concentration, population density and low canopy cover. This new tree population was projected through time to estimate potential air quality and carbon benefits. Those trees will likely remove more than 10 000 tons of air pollutants and a maximum of 1500 tons of carbon over the next 100 years given a 4% annual mortality rate. Cumulative carbon storage will be reduced through time as carbon loss through tree mortality outweighs carbon accumulation through tree growth. Model projections are strongly affected by mortality rate whose uncertainties limit estimations accuracy. Increasing mortality rate from 4 to 8% per year produce a significant decrease in the total pollution removal over a 100 year period from 11 000 tons to 3000 tons.
  - URL: [page](https://www.sciencedirect.com/science/article/abs/pii/S0269749110005336?via%3Dihub#!)
  - Best idea: Where to plan new trees based on pollution concentration, population density and low canopy cover and estimate potential air quality and carbon benefits.
  
- Source: Strategically growing the urban forest will improve our world
  - Description: Growth in urban populations creates opportunities for urban forests to deliver ecosystem services critical to human wellbeing and biodiversity. Our challenge is to strategically expand urban forests and provide our international communities, particularly the vulnerable, with healthier, happier, and enriched lives.
  - URL: [page](https://www.nature.com/articles/s41467-018-03622-0)
  - Best idea: How trees can provide ecosystem services critical to human wellbeing and biodiversity (no methodology)
  - Note: Trees can regulate climate and control floods, which can help prevent natural disasters that disproportionately affect low-income communities. Trees can also filter air and water, which can improve air quality and reduce the spread of waterborne diseases. Additionally, trees can provide food, fiber, and other resources that are important for human wellbeing. Finally, trees can provide recreational opportunities and spiritual benefits that contribute to mental health and community cohesion. Trees can also cool buildings through shading, cool the air through transpiration, silence noise through damping, and clean the air and water through filtration.
  
- Source: Ecophysiological responses of tree species due to air pollution for biomonitoring of environmental health in urban area
  - Description: The article discusses the use of the air pollution tolerance index (APTI) and anticipated performance index (API) to select appropriate plant species for shelter belt development in polluted urban areas. The study was conducted in three different sites in Santiniketan, West Bengal, India, and 18 plant species were analyzed for APTI and API. The results showed significant differences in APTI among the plant species and also among the different sites. Mangifera indica L. was found to be the best performer, while Polyalthia longifolia (Sonn.) Thwaites, Saraca asoka (Roxb.) Willd., and Ficus benghalensis L. were excellent performers. The study provides valuable information on plant species selection for shelter belt development in urban industrial areas with varying levels of air pollution.
  - URL: [page](https://www.sciencedirect.com/science/article/abs/pii/S221209552030122X)
  - Best idea: Chose the best tree to plant based on those indexes (APTI, API)

- Source: The economic value of trees in urban areas: estimating the benefits of adelaide's street trees
  - Description: This document provides valuable insights into the benefits of street trees in Adelaide and how they contribute to our communities. 
  - URL: [page](https://cdn.treenet.org/wp-content/uploads/2021/10/02TS-THE-ECONOMIC-VALUE-OF-TREES-IN-URBAN-AREAS_Killicoat-Puzio-Stringer.pdf)
  - Best idea: Shows some data and calculation but not the method behind
 
- Source: Assessing Nature-Based Recreation to Support Urban Green Infrastructure Planning in Trento (Italy)
  - Description: The ESTIMAP-recreation model is an innovative method used to assess the potential and opportunities for nature-based recreation in urban areas. It considers both the range of green spaces that provide the service and the locally-specific demand. The model works by analyzing various factors such as accessibility, availability, and quality of green spaces, as well as citizens' preferences and behaviors towards nature-based recreation. The results can help urban planners make informed decisions about how to improve urban green infrastructure planning to better support nature-based recreation.
  - URL: [page](https://www.researchgate.net/publication/327937807_Assessing_Nature-Based_Recreation_to_Support_Urban_Green_Infrastructure_Planning_in_Trento_Italy)
  - Best idea: Model to find opportunities for nature-based recreation in urban areas.
  

### General

- Source: Implementing and managing urban forests: A much needed conservation strategy to increase ecosystem services and urban wellbeing
  - Description: This research highlights the importance of urban nature conservation in megacities to contribute to human well-being. Megacities have a median tree cover density of 39 m2/capita, much smaller than the global average value of 7800 m2/capita, with density lower in desert and tropical biomes and higher in temperate biomes. The present median benefit value from urban trees in all 10 megacities can be estimated as $482 million/yr, with potential to nearly double the benefits by planting more trees in potential tree cover areas. Nature conservation strategies in megacities should sustain and grow the benefits of the urban forest, and improve accounting methods to include additional ecosystem services provided by the urban forest.
  - URL: [page](https://www.sciencedirect.com/science/article/pii/S0304380017300960?via%3Dihub)
  - Best idea: Why planting is important
  
- Source: The structure, function and value of urban forests in California communities
  - Description: This study analyzed urban forest structure and ecosystem services produced by trees in California by using tree data from field plots and numerical models. California's urban tree canopy covered 15% of urban areas, with a low UTC per capita, indicating an opportunity for more tree planting. Oaks were the most abundant taxon, and the annual value of ecosystem services was estimated at $8.3 billion, with an asset value of $181 billion. The threat of invasive species demonstrates that urban forests are a fragile resource whose contributions to human health and well-being can be jeopardized. Strategies to increase the resilience of California's urban forests are discussed to reduce the risk of catastrophic loss.
  - URL: [page](https://www.sciencedirect.com/science/article/abs/pii/S1618866717304582)
  - Best idea: Strategies to increase the resilience of California's urban forests to reduce the risk of catastrophic loss.


## Code <a name="code"></a>



## Conclusions <a name="conclusions"></a>

Take in cosideration
- Inflation can change the price of benefic and benefit
- Artificial trees
- General trends of forest and climate change 
