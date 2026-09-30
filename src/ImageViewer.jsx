import { Link, useParams } from "react-router-dom";
import "./ImageViewer.css";

const images = {
    "tree-map": {
        src: "/images/forest-nyc-trees.png",
        alt: "Map of NYC tree locations plotted over City Council district boundaries",
        title: "NYC Tree Points over City Council Districts",
        back: "/urban-forest",
    },

    "roc-curve": {
        src: "/images/clash-roc.png",
        alt: "ROC curve from the Clash Royale logistic regression model",
        title: "ROC Curve for Player 1 Win Prediction",
        back: "/clash-royale",
    },
};

export default function ImageViewer() {
    const { imageId } = useParams();
    const image = images[imageId];

    if (!image) {
        return (
            <main className="image-viewer-page">
                <p>Image not found.</p>
                <Link to="/">Return to portfolio</Link>
            </main>
        );
    }

    return (
        <main className="image-viewer-page">
            <div className="image-viewer-header">
                <div>
                    <span>FULL-SIZE VISUALIZATION</span>
                    <h1>{image.title}</h1>
                </div>

                <Link to={image.back}>← Back to project</Link>
            </div>

            <img
                src={image.src}
                alt={image.alt}
                className="image-viewer-image"
            />
        </main>
    );
}