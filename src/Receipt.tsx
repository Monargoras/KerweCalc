import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

interface ReceiptProps {
  order: Order,
}

export default function Receipt(props: ReceiptProps) {

  const renderItem = (item: OrderItem) => {
    return <View style={styles.item} key={item.name}>
      <View>
        <Text>{item.amount}</Text>
      </View>
      <View>
        <Text>{item.name}</Text>
      </View>
      <View>
        <Text>{(item.amount * item.price) + (item.needsDeposit ? item.amount * 2 : 0)}€ {item.needsDeposit ? ' inkl. Pfand' : ''}</Text>
      </View>
    </View>
  }

  return (
    <ScrollView style={styles.container}>
      {
        Object.values(props.order.items).filter((item) => item.group == 'Getränke').length > 0 &&
          <SafeAreaView>
            <Text style={styles.sectionHeader}>Getränke</Text>
            {
              Object.values(props.order.items).filter((item) => item.group == 'Getränke')
                .map((item) => renderItem(item))
            }
          </SafeAreaView>
      }
      {
        Object.values(props.order.items).filter((item) => item.group == 'Wein').length > 0 &&
          <SafeAreaView>
            <Text style={styles.sectionHeader}>Wein</Text>
            {
              Object.values(props.order.items).filter((item) => item.group == 'Wein')
                .map((item) => <Text style={styles.item} key={item.name}>{item.name}</Text>)
            }
          </SafeAreaView>
      }
      {
        Object.values(props.order.items).filter((item) => item.group == 'Essen').length > 0 &&
          <SafeAreaView>
            <Text style={styles.sectionHeader}>Essen</Text>
            {
              Object.values(props.order.items).filter((item) => item.group == 'Essen')
                .map((item) => <Text style={styles.item} key={item.name}>{item.name}</Text>)
            }
          </SafeAreaView>
      }
      {
        props.order.depositsPayed > 0 &&
        <SafeAreaView>
          <Text style={styles.sectionHeader}>Abzüge</Text>
          {renderItem({
            name: 'Pfand abgezogen',
            amount: props.order.depositsPayed,
            price: -2,
            needsDeposit: false,
            specialPrice: -2,
            group: 'Getränke'
          })}
        </SafeAreaView>
      }

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
})
