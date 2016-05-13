cs.ns("app.util.format");
app.util.format.DisplayFormatter = {

    /*These formatter should show an example and can be deleted if it is not needed*/
    userFormatter: (user) => {
        var currentUserName = "";
        if (user) {
            if (user.lastname && user.firstname) {
                currentUserName = user.lastname + ", " + user.firstname;
            } else if (user.lastname) {
                currentUserName = user.lastname;
            } else if (user.firstname) {
                currentUserName = user.firstname;
            }
            currentUserName += this.orgUnitFormatter(user.orgUnitName, true);
        }
        return currentUserName;
    }
}
