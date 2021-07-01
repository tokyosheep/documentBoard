(async()=>{
    const photoshop = require("photoshop");

    
    const listener = () => console.log(photoshop.app.documents);
    photoshop.action.addNotificationListener([
        {
            event:"select"
        },
        {
            event:"close"
        },
        {
            event:"open"
        }
    ],listener);

})();