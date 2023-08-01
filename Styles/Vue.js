import {  StyleSheet} from "react-native";

const Vue = StyleSheet.create({
    container: {
        flex: 7,
        backgroundColor: "#144E6D",
        alignItems: "center",
        justifyContent: "flex-start",
      },
      InputView: {
        flex: 1,
        backgroundColor: "#ffff",
        borderRadius: 15,
        marginTop: -30,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingLeft: 10,
        width: "94%",
        minHeight: 30,
      },
      Listes: {
        flex: 6,
        backgroundColor: "#ffff",
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "flex-start",
        width: "94%",
        marginTop: 30,
        marginBottom: 20
      },
      listItem: {
        borderBottomWidth: 3,
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 10,
        borderColor: "#000",
        ItemSeparatorComponent: "highlighted",
        minWidth: "100%",
      },
      listItemFav: {
        borderBottomWidth: 3,
        flexDirection: "row",
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 10,
        borderColor: "#000",
        minWidth: "100%",
      },
      listItemhorizontal: {
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
        borderRadius: 15,
        backgroundColor: "lightgray",
        width: 200,
        padding: 20,
      },
      entete:{
        width: '100%',
        backgroundColor: "#ffff",
        flexDirection: "row",
        height: 75,
        alignItems: "center",
        justifyContent: "flex-end",
        padding: 10,
      },
      DetailsCase: {
        flex: 6,
        backgroundColor: "#ffff",
        padding: 20,
        paddingBottom: 20,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "flex-start",
        width: "94%",
        marginBottom: 20,
      },
      DetailsCaseNom: {
        flex: 5,
        backgroundColor: "#ffff",
        padding: 20,
        paddingBottom: 20,
        borderRadius: 15,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        width: "94%",
        marginBottom: 20,
        marginTop: 20,
        flexDirection: "row",
      },
      DetailsCaseSwitch: {
        flex: 0.5,
        backgroundColor: "#ffff",
        padding: 20,
        paddingBottom: 20,
        borderRadius: 15,
        alignItems: "flex-start",
        justifyContent: "center",
        width: "94%",
        marginBottom: 20,
        marginTop: 20,
        flexDirection: "row",
      },
      DetailsCaseDesc: {
        flex: 1,
        backgroundColor: "#ffff",
        padding: 20,
        paddingBottom: 20,
        borderRadius: 15,
        alignItems: "flex-start",
        justifyContent: "center",
        width: "94%",
        marginBottom: 20,
        marginTop: 20,
      },
  });

export default Vue;