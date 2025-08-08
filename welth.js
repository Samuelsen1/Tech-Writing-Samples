import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Welcome to Welth</Text>
      <Text style={{ marginTop: 10, textAlign: 'center' }}>
        Monitor your medication and connect with your care network.
      </Text>
    </View>
  );
}

function DosageScreen() {
  const [meds, setMeds] = useState([]);
  const [name, setName] = useState('');

  const addMed = () => {
    if (name.trim()) {
      setMeds([...meds, { id: Date.now().toString(), name, taken: false }]);
      setName('');
    }
  };

  const toggleTaken = (id) => {
    setMeds(prev => prev.map(med => med.id === id ? { ...med, taken: !med.taken } : med));
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Medication Dosage</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter medication name"
        style={{ borderWidth: 1, padding: 8, marginBottom: 10, borderRadius: 5 }}
      />
      <Button title="Add Medication" onPress={addMed} />
      <FlatList
        data={meds}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => toggleTaken(item.id)}
            style={{
              padding: 10,
              marginTop: 10,
              backgroundColor: item.taken ? '#d4edda' : '#f8d7da',
              borderRadius: 5,
            }}
          >
            <Text>{item.name} - {item.taken ? 'Taken' : 'Missed'}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function DoctorScreen() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  const addContact = () => {
    if (name.trim() && role.trim()) {
      setContacts([...contacts, { id: Date.now().toString(), name, role }]);
      setName('');
      setRole('');
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Add Doctor or Caregiver</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Full Name"
        style={{ borderWidth: 1, padding: 8, marginBottom: 10, borderRadius: 5 }}
      />
      <TextInput
        value={role}
        onChangeText={setRole}
        placeholder="Role (e.g. Doctor, Caregiver)"
        style={{ borderWidth: 1, padding: 8, marginBottom: 10, borderRadius: 5 }}
      />
      <Button title="Add Contact" onPress={addContact} />
      <FlatList
        data={contacts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ marginTop: 10, padding: 10, backgroundColor: '#e2e3e5', borderRadius: 5 }}>
            <Text>{item.name} - {item.role}</Text>
          </View>
        )}
      />
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Dosage" component={DosageScreen} />
        <Tab.Screen name="Contacts" component={DoctorScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
