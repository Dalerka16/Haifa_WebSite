const BASE_URL = "http://localhost:8000";

/*creating functions that will be able to bring data(fetch),send data
these functions will be used inside our components in order to display some stuff*/

export const bringCourses = async () => {
    const response = await fetch(`${BASE_URL}/api/courses`);
    const data = await response.json();
    return data;
};


