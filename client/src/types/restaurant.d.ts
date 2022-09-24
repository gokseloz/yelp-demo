interface Restaurant {
    id: number,
    name: string,
    location: string,
    price_range: number,
    count: string,
    average_rating: string
}

interface Review {
    id: number,
    name: string,
    rating: number,
    review: string
}

interface RestaurantWithReview {
    restaurant: {
        id: number,
        name: string,
        location: string,
        price_range: number
        count: string,
        average_rating: string
    }
    reviews: Review[]
}


interface CreateRestaurant {
    name: string,
    location: string,
    price_range: number
}