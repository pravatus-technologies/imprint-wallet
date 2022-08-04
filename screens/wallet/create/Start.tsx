import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Block, Text, Button } from "../../../components";
import { WalletStackParamList } from "../../../constants/types";
import { useTheme } from "../../../hooks";
import { useWallet } from "../../../hooks/useWallet";

/***
 *
 * This is the first screen that appears once the application starts and no
 * wallet is associated with the signed-in account. The user will choose
 * to either Create a new wallet or Import an existing one.
 *
 */

 //type WalletCreateNavigationProps = NativeStackScreenProps<WalletStackParamList, "Start">;
 
export const Start = ({route, navigation} : any) => {
  // Themes and sizes
  const { sizes, colors, gradients } = useTheme();
  const { setIsCreateMode } = useWallet();

  const handleCreate = (mode: boolean) => {
    setIsCreateMode(mode);
    navigation.navigate("Create");
  }

  return (
    /* Screen Container */
    <Block safe marginTop="15%" marginHorizontal={sizes.sm}>
      {/* Page Header Container */}
      <Block
        marginTop={sizes.sm}
        justify="space-between"
        flex={.2}
      >
        {/* Page Title */}
        <Text right={0.3} h5 gray>
          Step 1 of 4
        </Text>
        <Text right={0.3} h4>
          Create or Import Wallet
        </Text>
        <Text p>
          Create a new wallet or import an existing account using your Private
          Key 24-Word Phrase
        </Text>
      </Block>
      {/* Content Block */}
      <Block>
        <Block marginTop="8%" justify="center">
          <Button
            onPress={() => handleCreate(false)}
            marginVertical={sizes.s}
            marginHorizontal={sizes.sm}
            gradient={gradients.primary}
            disabled={false}
          >
            <Text bold white transform="uppercase">
              Import Existing Wallet
            </Text>
          </Button>
          <Button
            onPress={() => handleCreate(true)}
            marginVertical={sizes.s}
            marginHorizontal={sizes.sm}
            gradient={gradients.primary}
            disabled={false}
          >
            <Text bold white transform="uppercase">
              Create New Wallet
            </Text>
          </Button>
        </Block>
      </Block>
      {/* Bottom Pane for Buttons */}
      {/* <Block
        flex={.15}
        justify="space-evenly"
        row
      >
        <Button width="45%" color={colors.secondary} marginHorizontal={sizes.sm} marginVertical={sizes.sm}>
          <Text>Back</Text>
        </Button>
        <Button width="45%" color={colors.primary} marginHorizontal={sizes.sm} marginVertical={sizes.sm}>
          <Text>Next</Text>
        </Button>
      </Block> */}
    </Block>
  );
};
