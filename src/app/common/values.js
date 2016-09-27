module.exports = (app) => {

    let key = "YourKeyHere";
    app.value("endpoint", "https://api-public.guidebox.com/v1.43/US/" + key + "/");
    app.value("$routerRootComponent", "app");

};