import * as React from 'react';
import { List } from 'react-native-paper';
import { ScrollView, StyleSheet, View } from 'react-native';
import drinksJSON from '../data/drinks.json';
import wineJSON from '../data/wine.json';
import foodJSON from '../data/food.json';
import ListItem from './ListItem';
import { Dimensions } from 'react-native';
import TotalView from './TotalView';

export default function Calculator() {
  const [expanded, setExpanded] = React.useState('')

  const handlePress = (newOpen: string) => setExpanded(newOpen)

  const [order, setOrder] = React.useState<Order>({items: {}, depositsPayed: 0, totalPrice: 0})

  const addItem = (newItem: KerweItem) => {
    let orderItems = JSON.parse(JSON.stringify(order.items))
    orderItems[newItem.name] ? orderItems[newItem.name].amount = orderItems[newItem.name].amount + 1 : orderItems[newItem.name] = {...newItem, amount: 1}
    setOrder({...order, items: orderItems})
  }

  const removeItem = (removeItem: KerweItem) => {
    let orderItems = JSON.parse(JSON.stringify(order.items))
    if(orderItems[removeItem.name]) {
      orderItems[removeItem.name].amount = orderItems[removeItem.name].amount - 1
      if(orderItems[removeItem.name].amount == 0)
        delete orderItems[removeItem.name]
    }
    setOrder({...order, items: orderItems})
  }

  const setDepositsPayed = (value: number) => {
    let newOrder = JSON.parse(JSON.stringify(order))
    newOrder.depositsPayed = value
    setOrder(newOrder)
  }

  const resetOrder = () => {
    setOrder({items: {}, depositsPayed: 0, totalPrice: 0})
  }

  return (
    <View style={styles.container}>
      <List.Section title='Kerwetreff 2022'>
        <List.Accordion
          title='Getränke'
          left={props => <List.Icon {...props} icon='beer' />}
          expanded={expanded == 'Drinks'}
          onPress={() => expanded == 'Drinks' ? handlePress('') : handlePress('Drinks')}
        >
          <ScrollView style={styles.scroll}>
            {
              drinksJSON.map((item: KerweItem) => <ListItem
                item={{...item, amount: order.items[item.name] ? order.items[item.name].amount : 0, group: 'Getränke'}}
                addItem={addItem}
                removeItem={removeItem}
                key={item.name}
              />)
            }
          </ScrollView>
        </List.Accordion>

        <List.Accordion
          title='Essen'
          left={props => <List.Icon {...props} icon='hamburger' />}
          expanded={expanded == 'Food'}
          onPress={() => expanded == 'Food' ? handlePress('') : handlePress('Food')}
        >
          <ScrollView style={styles.scroll}>
            {
              foodJSON.map((item: KerweItem) => <ListItem
                item={{...item, amount: order.items[item.name] ? order.items[item.name].amount : 0, group: 'Getränke'}}
                addItem={addItem}
                removeItem={removeItem}
                key={item.name}
              />)
            }
          </ScrollView>
        </List.Accordion>

        <List.Accordion
          title='Wein'
          left={props => <List.Icon {...props} icon='bottle-wine' />}
          expanded={expanded == 'Wine'}
          onPress={() => expanded == 'Wine' ? handlePress('') : handlePress('Wine')}
        >
          <ScrollView style={styles.scroll}>
            {
              wineJSON.map((item: KerweItem) => <ListItem
                item={{...item, amount: order.items[item.name] ? order.items[item.name].amount : 0, group: 'Getränke'}}
                addItem={addItem}
                removeItem={removeItem}
                key={item.name}
              />)
            }
          </ScrollView>
        </List.Accordion>
      </List.Section>
      <TotalView order={order} setDepositsPayed={setDepositsPayed} resetOrder={resetOrder}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  scroll: {
    height: Dimensions.get('window').height * 0.75,
  },
})
