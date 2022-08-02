import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Block, Text, Button} from '../../../components';
import { WalletStackParamList } from '../../../constants/types';
import { useTheme } from '../../../hooks';

type WalletCreateNavigationProps = NativeStackScreenProps<WalletStackParamList, "Create">;

export const Create = ({navigation}: WalletCreateNavigationProps) => {
    const {sizes} = useTheme();
    
    return (
        <Block safe marginHorizontal={sizes.sm}>
            <Text h3>Create new wallet</Text>
            <Button>
                <Text>Create</Text>
            </Button>
        </Block>
    );
};