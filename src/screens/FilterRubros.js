import { Button, Radio, ScrollView, Text, View } from "native-base";
import React, { useEffect, useState } from "react";
import useCustomToast from "../hooks/useCustomToast";
import { categoryAPI } from "../api/categoyAPI";
import useAuthContext from "../hooks/useAuthContext";
import { MaterialIcons } from "@expo/vector-icons";

const FilterRubros = ({ navigation }) => {
  const {
    state: { selectedCategory },
    dispatch,
  } = useAuthContext();
  const { showErrorToast } = useCustomToast();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(-1);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await categoryAPI.getCategories();

        if (data?.items.length > 0) {
          setCategories([{ id: -1, name: "Todos los rubros" }, ...data?.items]);
        }
      } catch (error) {
        showErrorToast("error filtro rubro");
      }
    };

    getCategories();
  }, []);

  useEffect(() => {
    console.log(categories)
    if (selectedCategory) {
      setCategory(selectedCategory.id);
    }
  }, [selectedCategory]);

  return (
    <>
      <ScrollView flex={1} backgroundColor="#fff">
        <View width="80%" alignSelf="center" my="16">
          <Text color="#41634A" fontSize={20} fontWeight={700} mb={3}>
            Filtrar por rubro
          </Text>

          {categories?.length > 0 && (
            <Radio.Group
              _radio={{
                borderColor: "#DB7F50",
                _light: {
                  _checked: {
                    borderColor: "#41634A",
                    _icon: {
                      color: "#41634A",
                    },
                  },
                  _icon: {
                    color: "#41634A",
                  },
                },
                _dark: {
                  _checked: {
                    borderColor: "#41634A",
                    _icon: {
                      color: "#41634A",
                    },
                  },
                  _icon: {
                    color: "#41634A",
                  },
                },
              }}
              defaultValue="-1"
              name="myRadioGroup"
              accessibilityLabel="favorite number"
              value={category}
              onChange={(nextValue) => setCategory(nextValue)}
            >
              {categories.map((cat) => (
                <Radio
                  key={cat.id}
                  value={cat.id}
                  my={2}
                  _text={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: "#9393AA",
                  }}
                >
                  {cat?.name}
                </Radio>
              ))}
            </Radio.Group>
          )}
        </View>
      </ScrollView>
      <View pb={16} bgColor="#fff">
        <Button
          bgColor="#DB7F50"
          borderRadius="20"
          width="80%"
          alignSelf="center"
          onPress={() => {
            const findCategory = categories.find((cat) => cat.id === category);

            dispatch({
              type: "SET_CATEGORY",
              payload: {
                id: findCategory?.id,
                name: findCategory?.name,
              },
            });

            navigation?.goBack();
          }}
        >
          <Text color="white" fontSize="lg">
            APLICAR
          </Text>
        </Button>
      </View>
    </>
  );
};

export default FilterRubros;
