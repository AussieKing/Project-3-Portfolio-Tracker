import axios from "axios";

export const addToWatchlist = async (user, coinData, addToWatchlistGQL) => {
  try {
    const response = await addToWatchlistGQL({
      variables: {
        userId: user?.uid,
        coin: coinData,
      },
    });
    const responseData = response.data.addToWatchlist;
  
    // Now handling based on the server's response structure
    alert(responseData.message);
  } catch (error) {
    console.error("Failed to add to watchlist", error);
    alert("Error: " + (error?.message || "Unknown error occurred."));
  }
};