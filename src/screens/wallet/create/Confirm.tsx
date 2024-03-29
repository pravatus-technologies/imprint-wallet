import { Text, Block, Button } from "../../../components";
import React, { useCallback, useState } from "react";
import { useTheme, useWallet } from "../../../hooks";
import { t } from "i18n-js";
import { IMnemonic } from "../../../constants/types";
import Phrase from "../../../components/Phrase";

export const Confirm = ({ navigation }: any) => {
  const { recoveryPhrase, isCreateMode } = useWallet();
  const { sizes, colors } = useTheme();

  const [validator, setValidator] = useState<IMnemonic[]>(
    recoveryPhrase as IMnemonic[]
  );

  /**
   * Memoized callback for the Phrase handler component.
   */
  const handlePhraseChange = useCallback(
    (value: IMnemonic) => {
      let itemToValidate = (validator as IMnemonic[])[value.order - 1];
      let validatedList: IMnemonic[] = [];

      // If the entered phrase on the input box {value.test} is
      // the same as the phrase value for the Mnemonic object
      if (itemToValidate.phrase === value.test) {
        // Object deconstruction, set the properties of itemToValidate to
        // the values of properties of {value}
        itemToValidate = { ...itemToValidate, ...value };
        (validator as IMnemonic[])[value.order - 1] = itemToValidate;

        // The test passed, set the validated property to true
        // and deconstruct validator the the validated list for updates.
        itemToValidate.validated = true;
        validatedList = [...validator, ...validatedList];

        setValidator(validatedList);
      }
    },
    [validator]
  );

  const handleNext = async () => {
    // check the validator phrases if all passed
    let confirmedCount = validator.filter(
      (m) => m.verify && m.validated
    ).length;
    if (confirmedCount < 7) return;

    navigation.replace("Save");
  };

  return (
    /* Screen Container */
    <Block safe marginTop="10%" marginHorizontal={sizes.sm}>
      {/* Page Header Container */}
      <Block marginTop={sizes.s} justify="space-between" flex={0.28}>
        {/* Page Title */}
        <Text right={0.3} h5 gray>
          {t("wallet.create.confirm.step")}
        </Text>
        <Text right={0.3} h4>
          {t("wallet.create.confirm.title")}
        </Text>
        <Text p>{t("wallet.create.confirm.description")}</Text>
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
          {validator?.map((mnemonic: IMnemonic) => (
            <Phrase
              key={`phrase-${mnemonic.order}`}
              order={mnemonic.order}
              phrase={mnemonic.verify ? "" : mnemonic.phrase}
              disabled={!mnemonic.verify}
              success={Boolean(mnemonic.validated)}
              onChangeText={(value) =>
                handlePhraseChange({ order: mnemonic.order, test: value })
              }
            />
          ))}
        </Block>
      </Block>
      {/* Bottom Pane for Buttons */}
      <Block flex={0.15} justify="space-evenly" row>
        <Button
          width="45%"
          color={colors.secondary}
          marginHorizontal={sizes.sm}
          marginVertical={sizes.sm}
        >
          <Text>Back</Text>
        </Button>
        <Button
          width="45%"
          color={colors.primary}
          marginHorizontal={sizes.sm}
          marginVertical={sizes.sm}
          onPress={handleNext}
        >
          <Text>Next</Text>
        </Button>
      </Block>
    </Block>
  );
};
