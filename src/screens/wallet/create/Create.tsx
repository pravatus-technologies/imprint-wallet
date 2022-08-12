import { Button, Block, Text, Checkbox } from "../../../components";
import Phrase from "../../../components/Phrase";
import { useTheme, useTranslation } from "../../../hooks";
import { useWallet } from "../../../hooks";
import { IMnemonic } from "../../../constants/types";
import { useState } from "react";

export const Create = ({ navigation }: any) => {
  const { t } = useTranslation();
  const { sizes, colors, gradients } = useTheme();
  const {
    recoveryPhrase,
    setRecoveryPhrase,
    isCreateMode,
    generatePhraseConfirmation,
  } = useWallet();

  const [isWrittenDown, setIsWrittenDown] = useState(false);

  const handleNext = () => {
    const confirmationArray = generatePhraseConfirmation(
      recoveryPhrase as IMnemonic[]
    );
    setRecoveryPhrase(confirmationArray);
    navigation.replace("Confirm");
  };

  const handleIsWrittenDown = (value: boolean) => {
    console.log(`isWrittenDown: ${isWrittenDown} setting to ${value}`);
    setIsWrittenDown(value);
  };

  return (
    /* Screen Container */
    <Block safe marginHorizontal={sizes.sm}>
      {/* Page Header Container */}
      <Block marginTop={sizes.s} justify="space-between" flex={0.28}>
        {/* Page Title */}
        <Text right={0.3} h5 gray>
          {t("wallet.create.create.step")}
        </Text>
        <Text right={0.3} h4>
          {isCreateMode
            ? t("wallet.create.create.title")
            : t("wallet.recover.recover.title")}
        </Text>
        <Text p>
          {isCreateMode
            ? t("wallet.create.create.description")
            : t("wallet.recover.recover.description")}
        </Text>
      </Block>
      {/* Content Block */}
      <Block
        marginTop="2%"
        scroll
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingBottom: sizes.l }}
      >
        <Block row wrap="wrap" justify="space-evenly" marginTop={sizes.sm}>
          {/* Create a view with max width or set width so it will wrap around the block */}
          {recoveryPhrase?.map((mnemonic: IMnemonic) => (
            <Phrase
              key={`phrase-${mnemonic.order}`}
              order={mnemonic.order}
              phrase={mnemonic.phrase}
              disabled={isCreateMode}
              onBlur={() => console.log("blur")}
              onChangeText={(value) => console.log(`${mnemonic.order}`)}
            />
          ))}
        </Block>
      </Block>
      <Block
        row
        flex={0.1}
        align="center"
        justify="space-evenly"
        paddingHorizontal={sizes.sm}
        marginTop={sizes.sm}
      >
        <Checkbox
          marginRight={sizes.xs}
          checked={isWrittenDown}
          onPress={handleIsWrittenDown}
        />
        <Text paddingRight={0} marginTop={0} size={sizes.sm}>
          I finished saving my 24-word phrase.
        </Text>
      </Block>
      {/* Bottom Pane for Buttons */}
      <Block flex={0.15} justify="space-evenly" row>
        <Button
          width="45%"
          gradient={gradients.secondary}
          marginHorizontal={sizes.sm}
          marginVertical={sizes.sm}
        >
          <Text p white bold transform="uppercase">
            Back
          </Text>
        </Button>
        <Button
          width="45%"
          gradient={gradients.primary}
          marginHorizontal={sizes.sm}
          marginVertical={sizes.sm}
          onPress={handleNext}
        >
          <Text p white bold transform="uppercase">
            Next
          </Text>
        </Button>
      </Block>
    </Block>
  );
};
