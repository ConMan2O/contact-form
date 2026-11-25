export function validateForm(data){
    console.log("Validating...");
    console.log(data);


    const errors = [];

    // validate first name
    if (!data.first || data.first.trim() === "") {
        errors.push("First name is required.");
    }
    // validate last name
    if (!data.last || data.last.trim() === "") {
        errors.push("Last name is required.");
    }

    // validate where we met
    const validMeet = ['School', 'Hackathon', 'Conference', 'Other'];
    if (!validMeet.includes(data.meet)) {
        errors.push("Select how we met.");
    }

    // validate format
    if (data.mailing) {
        const validFormat = ['html', 'text'];
        if (!validFormat.includes(data.format)) {
            errors.push("Select a valid email format.");
        }
    }

    console.log(errors);
    return{
        isValid: errors.length === 0,
        errors
    };

}