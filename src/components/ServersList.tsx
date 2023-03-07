import {
  Box,
  Button,
  Card,
  CardFooter,
  CardHeader,
  Grid,
  GridItem,
  Heading,
  Input,
  List,
  ListItem,
} from '@chakra-ui/react';
import { useStore } from 'effector-react';
import { $servers, fx_addServer, fx_deleteServer, fx_useServer } from '../stores/servers';

export function ServersList(props: {}) {
  const servers = useStore($servers);
  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    fx_addServer(e.target.value);
    e.target.value = '';
  };
  const handleDelete = (s: string) => {
    fx_deleteServer(s);
  };
  const handleUse = (s: string) => {
    fx_useServer(s);
  };
  return (
    <Box maxWidth={'4xl'} alignItems={'start'}>
      <Heading size={'md'} pb={'2'}>
        Servers
      </Heading>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {servers.map((s) => (
          <GridItem key={s}>
            <Card>
              <CardHeader>{s}</CardHeader>
              <CardFooter gap={2}>
                <Button onClick={() => handleDelete(s)} colorScheme={'red'}>
                  Delete
                </Button>
                <Button onClick={() => handleUse(s)} colorScheme={'green'}>
                  Manage
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        ))}
      </Grid>
      <Input mt={6} onBlur={(e) => handleBlur(e)}></Input>
    </Box>
  );
}
