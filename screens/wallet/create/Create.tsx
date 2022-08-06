import { Block, Text, Button } from "../../../components";
import Phrase from "../../../components/Phrase";
import { useTheme, useTranslation } from "../../../hooks";
import { useWallet } from "../../../hooks";
import { IMnemonic } from "../../../constants/types";

export const Create = ({ navigation }: any) => {
  const { t } = useTranslation();
  const { sizes, colors } = useTheme();
  const { recoveryPhrase, setRecoveryPhrase, isCreateMode, generatePhraseConfirmation } = useWallet();

  const handleNext = () => {
    const confirmationArray = generatePhraseConfirmation(recoveryPhrase as IMnemonic[]);
    setRecoveryPhrase(confirmationArray);
    navigation.replace("Confirm");
  }

  return (
    /* Screen Container */
    <Block safe marginTop="10%" marginHorizontal={sizes.sm}>
      {/* Page Header Container */}
      <Block marginTop={sizes.s} justify="space-between" flex={0.28}>
        {/* Page Title */}
        <Text right={0.3} h5 gray>
          Step 2 of 4
        </Text>
        <Text right={0.3} h4>
          {isCreateMode ? t("create.title.create") : t("create.title.recover")}
        </Text>
        <Text p>
          {isCreateMode
            ? t("create.description.create")
            : t("create.description.recover")}
        </Text>
      </Block>
      {/* Content Block */}
      <Block
        marginTop="2%"
        scroll
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingBottom: sizes.l }}
      >
        <Block
          row
          wrap="wrap"
          justify="space-evenly"
          marginTop={sizes.sm}
        >
          {/* Create a view with max width or set width so it will wrap around the block */}
          {
	    recoveryPhrase?.map((mnemonic: IMnemonic) => (
	    	<Phrase key={`phrase-${mnemonic.order}`} 
			order={mnemonic.order}
			phrase={mnemonic.phrase} 
	    		disabled={isCreateMode}
			onBlur={()=>console.log('blur')}
			onChangeText={(value)=>console.log(`${mnemonic.order}`)}/>
	    ))	
	  }
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
