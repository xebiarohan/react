export default function MealDetails({params}) {
    return(
        <>
            <h1>Meal details page</h1>
            <h2>{params.slug}</h2>
        </>
    )
}