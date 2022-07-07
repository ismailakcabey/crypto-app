import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View , ScrollView , Linking , RefreshControl} from 'react-native';
import { useEffect , useState , useCallback } from 'react';
import Axios from 'axios'
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  NativeBaseProvider,
  config,
  Box,
  HStack,
  Avatar,
  VStack,
  Spacer,
  AspectRatio,
  Image,
  Center,
  Stack,
  Heading,
  Button,
  Input
} from 'native-base';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function App() {
  
  const [list , setList] = useState([])
  useEffect(() => {
    Axios.get("https://api.coinstats.app/public/v1/coins?skip=0").then(
      (response) => {
        setList(response.data.coins);
      }
    );
  }, []);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);



  return (
    <SafeAreaView>
    
    <ScrollView>
    <NativeBaseProvider config={config}>
      
    </NativeBaseProvider>
    <View style={styles.container}>
      {list.map(a=>{
        
        return(
          <NativeBaseProvider key={a.id} config={config}>
            
          <Box alignItems="center" padding={8} bg={"blue.400"}>
      <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.800" borderWidth="1" _dark={{
      borderColor: "coolGray.600",
      backgroundColor: "gray.700"
    }} _web={{
      shadow: 2,
      borderWidth: 0
    }} _light={{
      backgroundColor: "gray.50"
    }}>
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image source={{
            uri: a.icon
          }} alt="image" />
          </AspectRatio>
          <Center bg="violet.500" _dark={{
          bg: "violet.400"
        }} _text={{
          color: "warmGray.50",
          fontWeight: "700",
          fontSize: "xs"
        }} position="absolute" bottom="0" px="3" py="1.5">
            ICON
          </Center>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              {a.name}
            </Heading>
            <Text fontSize="xs" _light={{
            color: "violet.500"
          }} _dark={{
            color: "violet.400"
          }} fontWeight="500" ml="-0.5" mt="-1">
              {a.price}
            </Text>
          </Stack>
          <Text fontWeight="400">
            <VStack>
              <Text>Web Site: </Text>
              <Button 
              onPress={
                ()=>{
                    Linking.openURL(a.websiteUrl);  
              } 
            }
              >Go</Button>
              <Text>Social Media: </Text>
              <Button
              onPress={
                ()=>{
                    Linking.openURL(a.twitterUrl);  
              } 
            }
              >Go</Button>
            </VStack>
          </Text>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Text color="coolGray.600" _dark={{
              color: "warmGray.200"
            }} fontWeight="400">
                
              </Text>
            </HStack>
          </HStack>
        </Stack>
      </Box>
    </Box>
          </NativeBaseProvider>
          
          
        )
      })}
      <StatusBar style="auto" />
    </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
