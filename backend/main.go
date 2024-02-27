package main

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

// Define a struct to match the structure of the JSON response
type RecipeResponse struct {
	Recipes []Recipe `json:"recipes"`
}

// Define the structure of a recipe
type Recipe struct {
	ExtendedIngredients []Ingredient `json:"extendedIngredients"`
}

// Define the structure of an ingredient in a recipe
type Ingredient struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Image string `json:"image"`
}

// Define a simplified struct to match the structure of the JSON response
type RecipeInfo struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
	Image string `json:"image"`
}

type RecipeSummary struct {
	ID int `json:"id"`
	Title string `json:"title"`
	Image string `json:"image"`
	Summary string `json:"summary"`
}

// Function to handle GET request for random recipes
func getRandomRecipes(c *gin.Context) {
	// Get the Spoonacular API key from the environment variable
	spoonacularAPIKey := os.Getenv("API_KEY")
	if spoonacularAPIKey == "" {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": "API_KEY is not set"})
		return
	}

	// Construct the Spoonacular API URL
	url := "https://api.spoonacular.com/recipes/random?apiKey=" + spoonacularAPIKey

	// Make a GET request to the Spoonacular API
	resp, err := http.Get(url)
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch random recipes"})
		return
	}
	defer resp.Body.Close()

	// Check the response status code
	if resp.StatusCode != http.StatusOK {
		c.IndentedJSON(resp.StatusCode, gin.H{"error": "Spoonacular API returned non-200 status code"})
		return
	}

	// Read the response body
	responseData, err := io.ReadAll(resp.Body)
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": "Failed to read response body"})
		return
	}

	// Unmarshal the response body into a RecipeResponse struct
	var recipeResponse RecipeResponse
	if err := json.Unmarshal(responseData, &recipeResponse); err != nil {
		log.Println("Unmarshal error:", err)
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode response body"})
		return
	}

	// Return the recipes
	c.IndentedJSON(http.StatusOK, recipeResponse)
}

// Function to handle GET request for recipes by ingredients
func getRecipesByIngredients(c *gin.Context){
	// Get ingredients from query
	ingredients := c.QueryArray("ingredients")
	if len(ingredients) == 0 {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "No ingredients provided."})
	}

	//Get API key
	spoonacularAPIKey := os.Getenv("API_KEY")
	if spoonacularAPIKey == "" {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": "API_KEY is not set"})
		return
	}

	// Construct the Spoonacular API URL
	url := "https://api.spoonacular.com/recipes/findByIngredients?apiKey=" + spoonacularAPIKey
	for _, ingredient := range ingredients {
		url += "&ingredients=" + ingredient
	}

	// Make a GET request to the Spoonacular API
	resp, err := http.Get(url)
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch recipes by ingredients"})
		return
	}
	defer resp.Body.Close()

	// Check the response status code
	if resp.StatusCode != http.StatusOK {
		c.IndentedJSON(resp.StatusCode, gin.H{"error": "Spoonacular API returned non-200 status code"})
		return
	}

	// Read the response body
	responseData, err := io.ReadAll(resp.Body)
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": "Failed to read response body"})
		return
	}

	var recipes []RecipeInfo
	if err := json.Unmarshal(responseData, &recipes); err != nil {
		log.Println("Unmarshal error:", err)
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode response body"})
		return
	}

	// Return the recipes
	c.IndentedJSON(http.StatusOK, recipes)
}

func getRecipesById(c *gin.Context){
	// get the recipe id from the URL
	id := c.Param("id")
	if id == "" {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"error": "No recipe Id provided."})
		return
	}
	// get the API from the .env
	spoonacularAPIKey := os.Getenv("API_KEY")
	if spoonacularAPIKey == "" {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": "API_KEY not set"})
		return
	}

	// make the URL with the API
	url := "https://api.spoonacular.com/recipes/" + id + "/information?apiKey=" + spoonacularAPIKey

	// Get request to the API
	resp, err := http.Get(url)
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch information."})
		return
	}
	defer resp.Body.Close()

	// check the resp status code
	if resp.StatusCode != http.StatusOK {
		c.IndentedJSON(resp.StatusCode, gin.H{"error": "Spoonacular API return non-200 status code."})
		return
	}

	// read the resp
	respData, err := io.ReadAll(resp.Body)
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": "failed to read response body."})
		return
	}

	//define struct that hold the resp json summary
	var recipeSummary RecipeSummary

	//unmarshall the resp body into the struct
	if err := json.Unmarshal(respData, &recipeSummary); err != nil {
		log.Println("Unmarshall err", err)
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode response body."})
		return
	}

	// return only twhat we need
	c.IndentedJSON(http.StatusOK, recipeSummary)
}

func main() {
	// Load environment variables from the .env file
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Create a new Gin router
	router := gin.Default()

	// Set up CORS middleware
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"PUT", "PATCH", "POST", "DELETE", "GET"},
		AllowHeaders:     []string{"Content-Type"},
		AllowCredentials: true,
	}))

	// Define the route for fetching random recipes
	router.GET("/recipes/random", getRandomRecipes)
	router.GET("/recipes/ingredients", getRecipesByIngredients)
	router.GET("/recipes/:id", getRecipesById)

	// Run the server on port 8080
	router.Run("localhost:8080")
}
