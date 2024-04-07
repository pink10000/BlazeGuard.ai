import numpy as np
from sklearn.cluster import DBSCAN
import alphashape
import shapely.geometry as geometry
from pathlib import Path

# Load data from file
data = []

with open("ml/output_file.txt", "r") as file:
    for row in file:
        pair = row.split(",")
        data.append((float(pair[0][:-5]), float(pair[1][:-5].strip())))  # Using strip() to remove newline characters

data = np.array(data)  # Convert data to a NumPy array for efficient processing

def dbscan_cluster(data, eps, min_samples):
    # Convert (lat, lon) from degrees to radians for Haversine metric
    data_radians = np.radians(data)
    # Initialize DBSCAN with Haversine metric
    dbscan = DBSCAN(eps=eps / 6371, min_samples=min_samples, metric='haversine', algorithm='ball_tree')
    clusters = dbscan.fit_predict(data_radians)
    return clusters

def get_alpha_shapes(data, clusters):
    alpha_shapes = []
    for cluster_label in np.unique(clusters):
        if cluster_label == -1:
            # Skip noise points
            continue

        # Filter points for the cluster
        cluster_points = data[clusters == cluster_label]

        # Create Alpha Shape
        alpha_shape = alphashape.alphashape(cluster_points)
        alpha_shapes.append(alpha_shape)
    
    return alpha_shapes


# Define DBSCAN parameters
eps = 0.036  # Adjust as needed, remember to convert this to radians or divide by Earth's radius in kilometers for Haversine
min_samples = 1  # Adjust as needed

# Get Clusters
clusters = dbscan_cluster(data, eps, min_samples)

alpha_shapes = get_alpha_shapes(data, clusters)
# print(alpha_shapes)

for i, p in enumerate(alpha_shapes):
    # print(f"{p.x}, {p.y}")
    alpha_shapes[i] = (p.x, p.y)

alpha_shapes = np.array(alpha_shapes)
indices = np.random.choice(len(alpha_shapes), size=100, replace=False)
sample_data = alpha_shapes[indices]
print(sample_data)

