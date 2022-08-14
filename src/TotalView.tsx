import * as React from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { Button } from 'react-native-paper';
import Receipt from './Receipt';

interface TotalViewProps {
  order: Order,
  setDepositsPayed: (value: number) => void,
  resetOrder: () => void,
}

export default function TotalView(props: TotalViewProps) {

  let total = 0
  Object.values(props.order.items).forEach(
    (item) => {
      total += (item.amount * item.price) + (item.needsDeposit ? item.amount * 2 : 0)
    })
  total -= props.order.depositsPayed * 2

  return (
    <ScrollView style={styles.container} contentContainerStyle={{height: '100%', width: '100%', alignItems: 'center', justifyContent: 'flex-start'}}>
      <Button
        mode='contained'
        onPress={() => props.setDepositsPayed(props.order.depositsPayed + 1)}
        onLongPress={() => props.setDepositsPayed(props.order.depositsPayed - 1)}
        style={{marginBottom: 15}}
      >
        Abgegebener Pfand: {props.order.depositsPayed}
      </Button>
      <Receipt order={props.order}/>
      <View
        style={{
          marginVertical: 15,
          width: '100%',
          borderBottomColor: 'black',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      <Text style={{marginBottom: 15, fontWeight: 'bold'}}>Gesamtbetrag: {total}€</Text>
      <Button
        mode='contained'
        onPress={() => {}}
        onLongPress={() => props.resetOrder()}
        color={'red'}
        style={{marginTop: 'auto', marginBottom: 5}}
      >
        Bestellung zurücksetzen
      </Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
})
