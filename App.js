
import React, { useState } from 'react';
import {
  Button,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Pdf from 'react-native-pdf';

const videos = [
  {
    id: 1,
    name: 'chapter1 video',
    startPage: 6,
    endPage: 6
  },
  {
    id: 2,
    name: 'chapter2 video',
    startPage: 7,
    endPage: 18
  },
  {
    id: 3,
    name: 'chapter3 video',
    startPage: 19,
    endPage: 21
  },
  {
    id: 4,
    name: 'chapter4 video',
    startPage: 22,
    endPage: 25
  },
  {
    id: 5,
    name: 'chapter5 video',
    startPage: 26,
    endPage: 30
  },

]

const App = ()=> {
  const source = { uri: 'https://www.tutorialspoint.com/react_native/react_native_tutorial.pdf', cache: true };
  const [videoName,setVideoName] = useState("");
  return (
      <View style={styles.container}>
        {videoName ? (<TouchableOpacity style= {styles.button}>
          <Text style = {styles.buttonText}>{videoName}</Text>
        </TouchableOpacity>) : null}
                <Pdf
                trustAllCerts={false}
                    source={source}
                    onLoadComplete={(numberOfPages,filePath) => {
                        console.log(`Number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page,numberOfPages) => {
                        console.log(`Current page: ${page}`);
                        const result = videos.find((item) => page  >= item?.startPage &&  page <= item.endPage);
                        if(result){
                          setVideoName(result.name)
                        }else{
                          setVideoName("")
                        }
                        console.log("result",result)
                    }}
                    onError={(error) => {
                        console.log(error);
                    }}
                    onPressLink={(uri) => {
                        console.log(`Link pressed: ${uri}`);
                    }}
                    style={styles.pdf}/>
            </View>
  )
}

export default App;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: 25,
  },
  pdf: {
      flex:1,
      width:Dimensions.get('window').width,
      height:Dimensions.get('window').height,
  },
  button: {
    width: 120,
    height: 30,
    borderRadius: 30,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    marginBottom: 10,
    padding: 2
  },
  buttonText: {
    color: "white",
    fontFamily: "bold",
    fontSize: 14,
    textAlign: "center"
  }
});

