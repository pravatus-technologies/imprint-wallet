import { Block, Text, Button } from "../../../components";
import { useTheme, useTranslation } from "../../../hooks";
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
  const {t} = useTranslation();
  const { sizes, colors, gradients } = useTheme();
  const { setIsCreateMode, setRecoveryPhrase, generateRecoveryPhrase } = useWallet();

  const handleCreate = async (mode: boolean) => {
    setIsCreateMode(mode);
    let phrase = await generateRecoveryPhrase();
    setRecoveryPhrase(phrase);
    navigation.replace("Create");
  }

  return (
    /* Screen Container */
    <Block safe marginHorizontal={sizes.sm}>
      {/* Page Header Container */}
      <Block
        marginTop={sizes.sm}
        justify="space-between"
        flex={.2}
      >
        {/* Page Title */}
        <Text right={0.3} h5 gray>
          {t("wallet.create.start.step")}
        </Text>
        <Text right={0.3} h4>
          {t("wallet.create.start.title")}
        </Text>
        <Text p>
          {t("wallet.create.start.description")}
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