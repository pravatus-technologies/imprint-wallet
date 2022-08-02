import { Block, Text, Button } from "../../../components";
import { useTheme } from "../../../hooks";

/***
 *
 * This is the first screen that appears once the application starts and no
 * wallet is associated with the signed-in account. The user will choose
 * to either Create a new wallet or Import an existing one.
 *
 */
export const Start = () => {
  // Themes and sizes
  const { sizes, colors, gradients } = useTheme();

  return (
    /* Screen Container */
    <Block safe marginHorizontal={sizes.sm}>
      {/* Page Header Container */}
      <Block
        flex={0.15}
        marginTop={sizes.sm}
        justify="space-between"
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
        <Block marginTop="8%">
          <Button
            onPress={() => console.warn("Import Existing")}
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
            onPress={() => console.warn("Create New Wallet")}
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
    </Block>
  );
};
