export const calculateBmi = (weight: number, height: number): string => {
    const bmi: number = (weight)/(height * height);
    if (bmi < 18.5) {
        return "Underweight";
    } else if (bmi < 25) {
        return "Normal (healthy weight)";
    } else {
        return "Overweight";
    }
};
