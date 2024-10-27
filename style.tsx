import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  // Estilos van aquí, sin cambios.
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    alignContent: 'center',
  },
  headerIcon: {
    width: 200,
    height: 50,
    color: '#666',
    // margin: 5,
  },
  headerText: {
    fontSize: 46,
    fontWeight: 'bold',
    marginBottom: 1,
  },
  searchIcon: {
    width: 30,
    height: 30,
  },
  subHeaderText: {
    fontSize: 16,
    marginBottom: 20,
    alignSelf: 'flex-start',
    color: '#666',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 25,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  activecartButton: {
    backgroundColor: '#d3d3d3',
    padding: 5,
    borderRadius: 5,
  },
  selectOtherButton: {
    backgroundColor: '#d3d3d3',
    padding: 5,
    borderRadius: 5,
  },
  selectOtherText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  paymentLogo: {
    width: 50,
    height: 30,
    marginRight: 10,
  },
  paymentText: {
    fontSize: 16,
  },
  methodText: {
    fontSize: 18,
  },
  brandIcon: {
    width: 40,
    height: 20,
    resizeMode: 'contain',
  },
  scan: {
    flex: 1,
    position: 'absolute',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#555',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  checkmark: {
    color: '#fff',
    fontSize: 18,
  },
  button: {
    width: 250,
    height: 250,
    borderRadius: 150,
    backgroundColor: '#D3D3D3',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  buttonText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#555',
  },
  scanImage: {
    width: 350, // Ajusta el ancho de la imagen
    height: 350, // Ajusta la altura de la imagen
    resizeMode: 'contain', //Mantiene la relación de aspecto de la imagen
    marginTop: 30,
    alignContent: 'center',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: -15,
    margin: 25,
    top: -60,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginVertical: 10,
  },
  actionButton: {
    backgroundColor: '#d3d3d3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  activecartText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pharmacyImage: {
    width: '100%',
    height: 400,
    resizeMode: 'contain',
    marginVertical: 0,
    top: 60,
  },
  pharmacyLocation: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
    marginBottom: -65,
    left: -120,
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  unnicalogo: {
    width: 180,
    height: 60,
    bottom: -180,
    marginTop: -140,
  },
  online: {
    backgroundColor: 'green',
    paddingVertical: 8,
    paddingHorizontal: 166,
    borderRadius: 5,
    bottom: -130,
  },
  onlineText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 50,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between', // separación de áreas táctiles
  },
  footerArea: {
    padding: 10,
    backgroundColor: 'transparent',
  },
  footerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  FooterContinue: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  poweredByContainer: {
    position: 'absolute',
    bottom: 50,
    right: 10,
  },
  poweredByText: {
    fontSize: 16,
    color: '#555',
  },
});
