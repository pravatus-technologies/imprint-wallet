import { TextInput, View } from "react-native";
import { Block, Text, Button, Input } from "../../../components";
import Phrase from "../../../components/Phrase";
import { useTheme, useTranslation } from "../../../hooks";
import { useWallet } from "../../../hooks";
import { IMnemonic } from "../../../constants/types";
import {useEffect} from "react";

export const Create = ({ route, navigation }: any) => {
  const { t } = useTranslation();
  const { sizes, colors } = useTheme();
  const { recoveryPhrase, isCreateMode } = useWallet();

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
            // words.map((word: any, index: number) => (
            //   <View key={`phrase-${index+1}`} style={{
            //     flexDirection: "row",
            //     justifyContent: "center",
            //     alignItems: "center",
            //     width: 165,
            //     borderColor: "gray",
            //     borderWidth: 1,
            //     borderRadius: 10,
            //     marginBottom: 5
            //   }}>
            //     <Input  autoCapitalize="none" style={{ width: "100%"}} order={(index + 1).toString()}>{word.phrase}</Input>
            //   </View>
            // ))
            //words.map((word: any, index: number) => (
            //  <Phrase key={`phrase-${index}`} order={word.order} phrase={word.phrase} disabled={isCreateMode} />
            //))
             
	    recoveryPhrase?.map((mnemonic: IMnemonic) => (
	    	<Phrase key={`phrase-${mnemonic.order + 1}`} 
			order={mnemonic.order + 1} 
			phrase={mnemonic.phrase} 
	    		disabled={isCreateMode}/>
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
        >
          <Text>Next</Text>
        </Button>
      </Block>
    </Block>
  );
};
