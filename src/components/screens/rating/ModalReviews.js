import React, { useEffect } from 'react'
import { AirbnbRating } from 'react-native-elements'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import useAuthContext from '../../../hooks/useAuthContext'
import useCustomToast from '../../../hooks/useCustomToast'
import useLoading from '../../../hooks/useLoading'
import { reviewAPI } from '../../../api/reviewAPI'
import {reviewSchema, reviewDefaultValues} from '../../../utils/formValidations/dataReviewValidation'
import { useNavigation } from '@react-navigation/native'

import {
  Text,
  FormControl,
  Modal,
  Button,
  TextArea,
} from 'native-base'

const NewReviewModal = ({ navigation, showModal, setShowModal }) => {

  const { showErrorToast, showSuccesToast } = useCustomToast()
  const { isLoading, startLoading, stopLoading } = useLoading()
  const Navigation = useNavigation()

  const {
    state: { user },
  } = useAuthContext()

  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(reviewSchema),
    defaultvalue: reviewDefaultValues,
  })

  const onSubmit = async (values) => {
    startLoading();
    try {
      const { data } = await reviewAPI.postReview({
        user_id: user.id,
        rating: values.rating,
        description: values.description,
        company_id: item.comercioId,
        title: "Review",
      })
      showSuccesToast('Tu comentario ha sido creado exitosamente');
      setShowModal(false)
      reset(reviewDefaultValues)
      Navigation.goBack();
    } catch (error) {
      showErrorToast(error.message)
    }
    stopLoading();
  }
   const item = {
    comercioId: navigation?.company_id,
    comercioName: navigation?.company?.name
   }
   useEffect(() => {
    console.log(item)
  }, [])

  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
    <Modal.Content width='90%'>
      <Modal.CloseButton />
      <Modal.Header>
        <Text bold textAlign='center' fontSize={'2xl'} color="#41634A" alignContent='center' justifyContent='center' alignSelf='center'>
               Queremos{'\n'}
          mejorar para ti
        </Text>
        <Text alignSelf='center' color="#9393AA" mt="2" fontSize={'xl'}>
        ¡Deja tus comentarios acá!
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Text bold color='#6E6E7A' alignSelf='center' fontSize={'lg'}>Comercio: {item.comercioName}</Text>

        <Controller
          name='rating'
          control={control}
          render={({ field: { onChange, value = 1 } }) => (
            <FormControl mt='1'
              isRequired
            >
              <FormControl.Label> <Text  fontSize={'lg'} color="#6E6E7A" bold> Calificación: </Text></FormControl.Label>
              <AirbnbRating
                reviewColor="#9393AA"
                reviewSize={16}
                count={5}
                reviews={['No me gustó', 'Estuvo regular', 'Me gustó', 'Me encantó', 'Me encantó y lo recomendaria']}
                showRating
                size={30}
                defaultRating={value}
                minValue={1}
                selectedColor={'#EEC048'}
                onFinishRating={(value) => onChange(value)}
              />

            </FormControl>
          )}
        />
        <Controller
          name='description'
          control={control}
          render={({ field: { onChange, value = '', ...field } }) => (
            <FormControl
              isRequired
            >
              <FormControl.Label><Text mt='4' fontSize={'lg'} color="#6E6E7A" bold> Comentarios:  </Text></FormControl.Label>
              <TextArea 
                borderRadius='10'
                borderColor='#F96332'
                placeholder='Escribe aqui...'
                onChangeText={onChange}
                value={value}
                {...field}
              />
            </FormControl>
          )}
        />

       

      </Modal.Body>
      <Modal.Footer>
        <Button.Group space={2}>
          <Button
            variant='ghost'
            colorScheme='blueGray'
            onPress={() => {
              setShowModal(false)
            }}
          >
            CANCELAR
          </Button>
          <Button
            isDisabled={!isValid || isLoading}
            isLoading={isLoading}
            bgColor="#DB7F50"
            size={'md'}
            minW={'30%'}
            onPress={handleSubmit(onSubmit)}
          >
            <Text bold color="white" fontSize="16">
              COMENTAR
            </Text>
          </Button>
        </Button.Group>
      </Modal.Footer>
    </Modal.Content>
  </Modal>
)
}
  export default NewReviewModal;