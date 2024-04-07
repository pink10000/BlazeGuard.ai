# crying-irl
Run as a regular node React app, but add `--legacy-peers-deps` to every command, and then run `npm run start`.

## Elevator Pitch

Interactive map of historical wildfire data that can be used to identify areas currently at risk, integrated with a fire prediction AI model (89% accurate) trained on a satellite image data set.


## Inspiration

In recent decades, climate change has emerged as an increasingly pressing issue, posing a significant threat to global livelihoods. The United States, in particular, faces scrutiny due to its high per capita carbon emissions. However, an equally urgent concern has been the devastating impact of wildfires. In recent years, wildfires have inflicted billions in property damage, obliterated entire towns, contaminated our air, and disproportionately affected marginalized communities. Our personal experiences with the destructive power of wildfires have driven us to seek solutions to this escalating problem. We recognize a pressing need for accessible, comprehensible, and relevant data to educate citizens about the dangers of wildfires and are inspired to bridge this gap.

Imagine a web application that not only monitors areas historically affected by wildfires but also leverages this data to inform and protect communities from potential risks. Such a tool could play a crucial role in raising awareness about the future implications of climate change. By providing civilians with actionable insights and supporting active forestry management, we aim to mitigate the risks associated with wildfires.

Our initiative stems from a gap in existing resources, which often lack specific information to your local community. You may not even be aware of all the fires that are stopped and require active response. Scientists need a way to look at fire trends at both a high and low level. Wildfires quickly grow out of control, destroy the environment, and emit entire forests’ worth of Carbon capture into the air. Local governments can use this data to get a holistic of the needs for preventing fires. Up to date satellite and navigation data makes analysis easy.

These are the motivations that drove us to make BlazeGuard.ai. We need to accelerate timber management programs to prevent the billions of dollars of damage that Americans face every year.

## What it does

BlazeGuard.ai is a AI-powered map that revolutionizes the way users can identify areas at risk of a wildfire, and view historical wildfire data across the United States. Users can click on the map to zoom in and see where wildfires have historically occurred, and can enter any address to view a specific location. Upon clicking a wildfire location, the marker will display metadata about the fire such as its location and size. Finally, users can view a heatmap of the most at-risk areas, as determined by our AI model. There are links to external resources that can help people prepare for evacuation, and find a path to safety.

Climate change is accelerating the incidences of climate disasters. These disasters displace millions of people every year. Scientists and fire departments do not currently have any tools to analyze past fires in a good interface so that they can improve controlled burns. Spreading awareness for the urgent needs of forestry management can save billions of dollars of damages.

## How we built it

We built the web application using React JS, Leaflet and TileLayer Maps. We added interactivity and search functionality using the Google Places API and javascript. We used historical data from a government website to display past fires. For the fire prediction model, we modified a ResNet 18-layer prediction pre-trained model with satellite imagery from a Canadian wildfire database over a 30 year period. We used the DSML datahub cluster to train the model and it achieved an 89% accuracy on newer wildfires. 

We used scikit-learn, numpy, and shapely to take the predicted fire locations and generate concave hulls that cluster high-risk zones for fire prediction. 

## Challenges we ran into

Computational power limits, lack of resources for hyperparameter tuning, incomplete proprietary data, data behind paywalls, low resolution images, integrating leaflet with react due to lack of documentation, building custom functions to display additional features, minimizing size of data set to allow browsers to handle it.

## Accomplishments that we're proud of

We are incredibly proud to be able to create a free, open-source tool that anyone can use and could potentially save the lives of many by increasing social awareness of the issue. Additionally, in the process of creating the map and AI model, we are proud to say that we learned much about front-end development using Javascript and deep learning techniques for web applications.

## What we learned

We improved our understanding in these key sectors of software engineering: computer vision, machine learning, web development, front-end technologies, and data visualization. For a comprehensive product to be built with real use cases, almost all areas of computer science must be touched upon to positively impact people at large scales. 

In terms of project logistics, we learned that building a technically-demanding software requires a significant amount of planning and comfort with the relevant key technologies. We also learned many UI/UX principles in accessibility practices for all users, especially those who need this kind of information the most. 

## What's next for Blaze Guard AI

We would like to expand our current dataset in order to both improve our model’s accuracy and provide support to other areas of the world. Our model, ResNet 18 is also very limited, especially as this a larger abundance of data that could be used to accurately train a decently large model. We also recognize that information such as historical weather data, humidity, and other factors such as deforestation can significantly alter our model; as such, the model currently can only generalize to areas that are more densely forested. Additionally, adding features such as an automatic escape route planner that can navigate users out of at-risk areas towards shelters would be great to have. One other feature that we would like to implement is real-time wildfire processing. For the purposes of this hackathon, we were not able to obtain an API key without paying exorbitant fees that would allow us to update our map automatically in real-time. However, including this data could be incredibly useful to keep up to date with current wildfires and safe locations.
