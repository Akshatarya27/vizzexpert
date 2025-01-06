import streamlit as st
import cv2
import numpy as np
from PIL import Image

MIN_AREA = 100  
MIN_HEIGHT = 5 


def detect_pillars(image):
    # Convert image to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Apply thresholding
    _, thresh = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)
    
    # Find contours
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    # Process and draw contours
    output_image = image.copy()
    pillars_points = []  # This will store the points for each pillar
    
    for contour in contours:
        # Calculate area and bounding box
        area = cv2.contourArea(contour)
        x, y, w, h = cv2.boundingRect(contour)

        # Filter out small objects and non-pillar-like shapes
        aspect_ratio = float(w) / h
        if area > MIN_AREA and h > MIN_HEIGHT and 0.1 <= aspect_ratio <= 0.8:
            # Generate a new random color for each pillar
            color = tuple(np.random.randint(0, 256, size=3).tolist())
            cv2.drawContours(output_image, [contour], -1, color, 2)  
            points = contour.reshape(-1, 2)  
            pillars_points.append(points)  
    
    return output_image, pillars_points  

# Function to save pillar points to a text file
def save_points_to_text(pillar_points):
    # Create a string to represent pillar points
    points_text = ""
    for idx, points in enumerate(pillar_points):
        points_text += f"Pillar {idx + 1}:\n"
        for point in points:
            points_text += f"{point[0]},{point[1]}\n"
        points_text += "\n"
    
    return points_text

# Streamlit UI components
st.title("Pillar Detection Application")

# Upload Image
uploaded_file = st.file_uploader("Choose an image...", type=["jpg", "png", "jpeg"])

if uploaded_file is not None:
    # Open the image file
    image = Image.open(uploaded_file)
    image = np.array(image)
    
    # Detect pillars and get pillar points
    output_image, pillars_points = detect_pillars(image)
    
    # Show original and processed images
    st.subheader("Original Image")
    st.image(uploaded_file, caption="Uploaded Image.", use_container_width=True)
    
    st.subheader("Detected Pillars")
    st.image(output_image, caption="Image with Pillars Detected", use_container_width=True)
    
    # Prepare the pillar points as text
    points_text = save_points_to_text(pillars_points)

    # Convert the points text to bytes and provide download option
    st.download_button(
        label="Download Pillar Points",
        data=points_text,
        file_name="pillar_points.txt",
        mime="text/plain"
    )
    
    # Option to download the processed image
    # Convert the output image to bytes for downloading
    is_success, buffer = cv2.imencode(".jpg", output_image)
    st.download_button(
        label="Download Processed Image",
        data=buffer.tobytes(),
        file_name="processed_pillars.jpg",
        mime="image/jpeg"
    )
