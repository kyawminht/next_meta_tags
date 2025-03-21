import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

// Fetch data on the server side
export async function getServerSideProps(context) {
  const { id } = context.params; // Get the prediction ID from the URL

  try {
    // Fetch prediction data from your API
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    const predictionData = response.data;
    console.log("Prediction data:", response.data);

    return {
      props: {
        predictionData, // Pass the data to the page component
      },
    };
  } catch (error) {
    console.error("Error fetching prediction data:", error);
    return {
      props: {
        predictionData: null, // Handle errors gracefully
      },
    };
  }
}

// Page component
export default function PredictionPage({ predictionData }) {
  const router = useRouter();
  const { id } = router.query; // Access the `id` parameter from the URL

  // Redirect users to the actual website
  React.useEffect(() => {
    if (typeof window !== "undefined" && id) {
      window.location.href = `https://exp-admin.nostradome.com/api/prediction/${id}`;
    }
  }, [id]);

  if (!predictionData) {
    return <div>Error loading prediction data.</div>;
  }

  return (
    <>
      {/* Dynamically generate meta tags */}
      <Head>
        <title>{predictionData.title}</title>
        <meta property="og:title" content={predictionData.title} />
        <meta property="og:description" content={predictionData.description} />
        <meta property="og:image" content={predictionData.image} />
        <meta property="og:url" content={`https://exp-admin.nostradome.com/api/prediction/${id}`} />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={predictionData.title} />
        <meta name="twitter:description" content={predictionData.description} />
        <meta name="twitter:image" content={predictionData.image} />
      </Head>

      {/* Minimal content for the page */}
      <div>
        <h1>{predictionData.title}</h1>
        <p>{predictionData.description}</p>
        <img src={predictionData.image} alt="Prediction Image" />
      </div>
    </>
  );
}