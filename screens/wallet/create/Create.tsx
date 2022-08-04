import { TextInput, View } from "react-native";
import { Block, Text, Button, Input } from "../../../components";
import { useTheme, useTranslation } from "../../../hooks";
import { useWallet } from "../../../hooks";

export const Create = ({ route, navigation }: any) => {
  const { t } = useTranslation();
  const { sizes, colors } = useTheme();
  const { isCreateMode } = useWallet();
  const words = [
    { order: 1, phrase: "abstract"},
    { order: 2, phrase: "engage"},
    { order: 3, phrase: "opposite"},
    { order: 4, phrase: "cheer"},
    { order: 5, phrase: "wisdom"},
    { order: 6, phrase: "scepter"},
    { order: 7, phrase: "cinnamon"},
    { order: 8, phrase: "business"},
    { order: 9, phrase: "tablet"},
    { order: 10, phrase: "luck"},
    { order: 11, phrase: "element"},
    { order: 12, phrase: "report"},
    { order: 13, phrase: "compare"},
    { order: 14, phrase: "structure"},
    { order: 15, phrase: "modest"},
    { order: 16, phrase: "traffic"},
    { order: 17, phrase: "supply"},
    { order: 18, phrase: "isolation"},
    { order: 19, phrase: "recover"},
    { order: 20, phrase: "space"},
    { order: 21, phrase: "between"},
    { order: 22, phrase: "office"},
    { order: 23, phrase: "nature"},
    { order: 24, phrase: "prefer"},
  ]
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
            words.map((word: {order: number, phrase: string}) => (
              <View style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: 120,
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 10,
                marginBottom: 5
              }}>
                <Input key={word.order} autoCapitalize="none" style={{ width: "100%"}} order={word.order.toString()}>{word.phrase}</Input>
              </View>
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
