import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button } from 'react-native';
import {MaterialCommunityIcons as Icon} from 'react-native-vector-icons';
/*import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
  responsiveMargin,
} from "react-native-responsive-dimensions";*/



export default class App extends React.Component{

  constructor(props){
    super(props);

    this.state = {

      gameState: [
              [0,0,0,0],
              [0,0,0,0],
              [0,0,0,0],
              [0,0,0,0]
          ] ,

      currentPlayer:1,
    }
  }

  componentDidMount(){
    this.startGame();
  }

  startGame = () => {
    this.setState({gameState:
      [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
      ],

      currentPlayer: 1,
    });
  }


  getWinner = (row,col) =>{
    const number_tiles = 4;
    var arr = this.state.gameState;
    var sum;

    //check rows
    for (var i = 0; i < number_tiles; i++){
      sum = arr[i][0] + arr[i][1] + arr[i][2 + arr[i][3]];
      if (sum == 3){
        return 1; }
      else if (sum == -4) {
        return -1; }
    }

    //check colums
    for (var i = 0; i < number_tiles; i++){
      sum = arr[0][i] + arr[1][i] + arr[2][i] + arr[3][i];
      if (sum ==3){
        return 1;}
      else if (sum == -3) {
        return -1; }
    }

    //diangonals right down
    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if (sum ==3){
      return 1;}
    else if (sum == -3) {
      return -1; }

    sum = arr[1][1] + arr[2][2] + arr[3][3];
    if (sum ==3){
      return 1;}
    else if (sum == -3) {
      return -1; }

    sum = arr[0][1] + arr[1][2] + arr[2][3];
    if (sum ==3){
      return 1;}
    else if (sum == -3) {
      return -1; }

    sum = arr[1][0] + arr[2][1] + arr[3][2];
    if (sum ==3){
      return 1;}
    else if (sum == -3) {
      return -1; }


    //diangonals left down
    sum = arr[0][2] + arr[1][1] + arr[2][0];
    if (sum ==3){
      return 1;}
    else if (sum == -3) {
      return -1;}

    sum = arr[0][3] + arr[1][2] + arr[2][1];
    if (sum ==3){
      return 1;}
    else if (sum == -3) {
      return -1;}

    sum = arr[0][4] + arr[1][3] + arr[2][2];
    if (sum ==3){
      return 1;}
    else if (sum == -3) {
      return -1;}

    sum = arr[1][4] + arr[2][3] + arr[3][2];
    if (sum ==3){
      return 1;}
    else if (sum == -3) {
      return -1;}
//else there are no winners
    return 0;

  }




  onTilePressed = (row,col) => {

    var currentPlayer = this.state.currentPlayer;
    //doesnt allow replacement tile
    var value = this.state.gameState[row][col];
    if (value !== 0) { return; };

    //place correct tile
    var arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({gameState: arr});

    //switch currentPlayer
    var nextPlayer = (currentPlayer == 1) ? -1 : 1;
    this.setState({currentPlayer: nextPlayer});

    //winner winner chicken dinner
    var winner = this.getWinner();
    if (winner == 1){
      Alert.alert("O has won the game");
      this.startGame();
    }
    else if (winner == -1){
      Alert.alert("X has won the game");
      this.startGame();
    }


  }

  resetGame = () => {
    this.startGame();
  }


  renderIcon = (row,col) => {
    var value = this.state.gameState[row][col];

    switch(value){
      case 1: return <View style={styles.tileO}/>;
      case -1: return <View style={styles.tileX}/>;
      default: return <View />;
    }

  }


  render(){
      return (
        <View style={styles.container}>
          <View style={styles.containerBorder}>
            <View style={styles.container2}>

              <Text style={styles.title}>BLIK WIK PO</Text>

              <View style = {{flexDirection:"row"}}>

                  <TouchableOpacity onPress={() => this.onTilePressed(0,0)} style={[styles.tile, {borderTopWidth:0,borderLeftWidth: 0}]}>
                            {this.renderIcon(0,0)}
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.onTilePressed(0,1)} style={[styles.tile, {borderTopWidth:0}]}>
                            {this.renderIcon(0,1)}
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.onTilePressed(0,2)} style={[styles.tile, {borderTopWidth:0, borderRightWidth:0}]}>
                            {this.renderIcon(0,2)}
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.onTilePressed(0,3)} style={[styles.tile, {borderTopWidth:0, borderRightWidth:0}]}>
                            {this.renderIcon(0,3)}
                  </TouchableOpacity>

              </View>

              <View style = {{flexDirection:"row"}}>
                <TouchableOpacity onPress={() => this.onTilePressed(1,0)} style={[styles.tile, {borderLeftWidth: 0}]}>
                        {this.renderIcon(1,0)}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.onTilePressed(1,1)} style={[styles.tile, {}]}>
                        {this.renderIcon(1,1)}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.onTilePressed(1,2)} style={[styles.tile, {borderRightWidth:0}]}>
                        {this.renderIcon(1,2)}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.onTilePressed(1,3)} style={[styles.tile, {borderRightWidth:0}]}>
                        {this.renderIcon(1,3)}
                </TouchableOpacity>
              </View>

              <View style = {{flexDirection:"row"}}>
                <TouchableOpacity onPress={() => this.onTilePressed(2,0)} style={[styles.tile, {borderBottomWidth:0,borderLeftWidth: 0}]}>
                      {this.renderIcon(2,0)}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.onTilePressed(2,1)} style={[styles.tile, {borderBottomWidth:0}]}>
                      {this.renderIcon(2,1)}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.onTilePressed(2,2)} style={[styles.tile, {borderBottomWidth:0,borderRightWidth:0}]}>
                      {this.renderIcon(2,2)}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.onTilePressed(2,3)} style={[styles.tile, {borderBottomWidth:0,borderRightWidth:0}]}>
                      {this.renderIcon(2,3)}
                </TouchableOpacity>

              </View>

              <View style = {{flexDirection:"row"}}>
                <TouchableOpacity onPress={() => this.onTilePressed(3,0)} style={[styles.tile, {borderBottomWidth:0,borderLeftWidth: 0}]}>
                      {this.renderIcon(3,0)}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.onTilePressed(3,1)} style={[styles.tile, {borderBottomWidth:0}]}>
                      {this.renderIcon(3,1)}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.onTilePressed(3,2)} style={[styles.tile, {borderBottomWidth:0,borderRightWidth:0}]}>
                      {this.renderIcon(3,2)}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.onTilePressed(3,3)} style={[styles.tile, {borderBottomWidth:0,borderRightWidth:0}]}>
                      {this.renderIcon(3,3)}
                </TouchableOpacity>

              </View>

              <Button title="RESET" onPress={this.resetGame} style= {styles.rButton}/>


            </View>
          </View>
        </View>
      );
    }
  }



const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#313131',

  },

  containerBorder:{
    margin: '1.5em',
    flex: 1,
    backgroundColor: 'transparent',
    borderColor: '#313131',
    overflow: 'hidden',
    shadowColor: 'black',
    shadowRadius: 15,
    shadowOpacity: 1,

  },

  container2: {
    flex:1,
    backgroundColor: '#313131',
    alignItems: 'center',
    justifyContent: 'center',

  },



  tile: {
    height:50,
    width:50,
    margin: 10,
    backgroundColor: 'transparent',
    borderColor: '#313131',
    shadowColor: 'black',
    shadowRadius: 15,
    shadowOpacity: 1,

  },

  tileO: {
    backgroundColor:'white',
    flex:1,
  },

  tileX: {
    backgroundColor:'black',
    flex:1,
  },

  rButton:{
    marginTop:10,
  },

});
