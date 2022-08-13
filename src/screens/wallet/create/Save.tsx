import { useState } from "react";
import { Text, Block, Button, Input } from "../../../components";
import { IAccount } from "../../../constants/types";
import { useAuth, useTheme, useTranslation, useWallet } from "../../../hooks";

export const Save = () => {
  const { sizes, colors } = useTheme();
  const { t } = useTranslation();
  const [nickname, setNickName] = useState("");
  const {saveNewAccount} = useWallet();
  const { account } = useAuth();


  const handleSaveWallet = async () => {
    try {
      saveNewAccount(account as IAccount, nickname);
    } catch (e) {
      console.log(`Error generating wallet: ${e}`);
    }
  };

  return (
    /* Screen Container */
    <Block safe marginHorizontal={sizes.sm}>
      {/* Page Header Container */}
      <Block marginTop={sizes.s} justify="space-between" flex={0.28}>
        {/* Page Title */}
        <Text right={0.3} h5 gray>
          {t("wallet.create.save.step")}
        </Text>
        <Text right={0.3} h4>
          {t("wallet.create.save.title")}
        </Text>
        <Text p>{t("wallet.create.save.description")}</Text>
      </Block>
      {/* Content Block */}
      <Block
        keyboard
        marginTop="2%"
        scroll
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingBottom: sizes.l }}
      >
        <Block row wrap="wrap" justify="space-evenly" marginTop={sizes.sm}>
          {/* Create a view with max width or set width so it will wrap around the block */}
          <Input
            style={{ width: "100%" }}
            placeholder="Nickname"
            onChangeText={(value) => setNickName(value)}
          />
        </Block>
      </Block>
      {/* Bottom Pane for Buttons */}
      <Block flex={0.15} justify="space-evenly" row>
        <Button
          width="100%"
          color={colors.primary}
          marginHorizontal={sizes.sm}
          marginVertical={sizes.sm}
          onPress={handleSaveWallet}
        >
          <Text>Save Wallet</Text>
        </Button>
      </Block>
    </Block>
  );
};
