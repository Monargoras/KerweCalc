import * as React from 'react';
import { List } from 'react-native-paper';
import { StyleSheet, Text } from 'react-native';

interface ListItemProps {
  item: OrderItem,
  addItem: (item: KerweItem) => void,
  removeItem: (item: KerweItem) => void,
}

export default function ListItem(props: ListItemProps) {

  return (
    <List.Item
      title={props.item.name}
      description={props.item.price + '€'}
      right={() => <Text style={styles.amount}>{props.item.amount}</Text>}
      onPress={() => props.addItem(props.item)}
      onLongPress={() => props.removeItem(props.item)}
      style={{marginLeft: -10}}
    />
  )
}

const styles = StyleSheet.create({
  amount: {
    marginTop: 15,
    marginRight: 15,
  },
})
