import React, { Component } from 'react';
import { StyleSheet, View, Button, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { Text } from '@ui';
import AutoInput from '@ui/AutoInput';
import { AppStyles, AppSizes } from '@theme';
import FormWrapper from 'tcomb-form-native';
import _ from 'lodash';

// === Configuring form ===
const Form = FormWrapper.form.Form;
const styling = _.cloneDeep(FormWrapper.form.Form.stylesheet);

//-- styling
styling.formGroup.normal.flexDirection = 'row';
styling.formGroup.error.flexDirection = 'row';
styling.formGroup.normal.alignItems = 'center';
styling.formGroup.error.alignItems = 'center';

styling.textbox.normal.width = AppSizes.screen.widthTwoThirds;
styling.textbox.error.width = AppSizes.screen.widthTwoThirds;
styling.textbox.normal.backgroundColor = '#fff';
styling.textbox.error.backgroundColor = '#fff';

styling.controlLabel.normal.width = AppSizes.screen.widthThird;
styling.controlLabel.error.width = AppSizes.screen.widthThird;

styling.select.normal.width = AppSizes.screen.widthTwoThirds;
styling.select.error.width = AppSizes.screen.widthTwoThirds;
styling.select.normal.height = 36;
styling.select.error.height = 36;
styling.select.normal.borderRadius = 4;
styling.select.error.borderRadius = 4;
styling.select.normal.backgroundColor = '#fff';
styling.select.error.backgroundColor = '#fff';

styling.checkbox.normal.height = 36;
styling.checkbox.error.height = 36;

styling.select.normal.borderRadius = 4;
styling.select.error.borderRadius = 4;

const FORM_CATEGORIES = FormWrapper.enums({
  _2266: 'Perawatan & Kecantikan',
  _2359: 'Kesehatan',
  _159: 'Fashion Wanita',
  _164: 'Fashion Pria',
  _7: 'Handphone',
  _1: 'Komputer',
  _510: 'Elektronik',
  _10: 'Kamera',
  _58: 'Hobi & Koleksi',
  _61: 'Olahraga',
  _64: 'Sepeda',
  _13: 'Fashion Anak',
  _68: 'Perlengkapan Bayi',
  _65: 'Rumah Tangga',
  _139: 'Food',
  _19: 'Mobil Part & Accessories',
  _471: 'Motor',
  _1648: 'Industrial',
  _70: 'Perlengkapan Kantor',
  _1695: 'Tiket & Voucher',
});

const FORM_PROVINCES = FormWrapper.enums({
  Bali: 'Bali',
  Banten: 'Banten',
  Bengkulu: 'Bengkulu',
  Daerah_Istimewa_Yogyakarta: 'Daerah Istimewa Yogyakarta',
  DKI_Jakarta: 'DKI Jakarta',
  Gorontalo: 'Gorontalo',
  Jambi: 'Jambi',
  Jawa_Barat: 'Jawa Barat',
  Jawa_Tengah: 'Jawa Tengah',
  Jawa_Timur: 'Jawa Timur',
  Kalimantan_Barat: 'Kalimantan Barat',
  Kalimantan_Selatan: 'Kalimantan Selatan',
  Kalimantan_Tengah: 'Kalimantan Tengah',
  Kalimantan_Timur: 'Kalimantan Timur',
  Kalimantan_Utara: 'Kalimantan Utara',
  Kepulauan_Bangka_Belitung: 'Kepulauan Bangka Belitung',
  Kepulauan_Riau: 'Kepulauan Riau',
  Lampung: 'Lampung',
  Maluku: 'Maluku',
  Maluku_Utara: 'Maluku Utara',
  Nanggroe_Aceh_Darussalam: 'Nanggroe Aceh Darussalam',
  Nusa_Tenggara_Barat: 'Nusa Tenggara Barat',
  Nusa_Tenggara_Timur: 'Nusa Tenggara Timur',
  Papua: 'Papua',
  Papua_Barat: 'Papua Barat',
  Riau: 'Riau',
  Sulawesi_Barat: 'Sulawesi Barat',
  Sulawesi_Selatan: 'Sulawesi Selatan',
  Sulawesi_Tengah: 'Sulawesi Tengah',
  Sulawesi_Tenggara: 'Sulawesi Tenggara',
  Sulawesi_Utara: 'Sulawesi Utara',
  Sumatera_Barat: 'Sumatera Barat',
  Sumatera_Selatan: 'Sumatera Selatan',
  Sumatera_Utara: 'Sumatera Utara',
});

const FORM_CONDITIONS = FormWrapper.enums({
  all_conditions: 'semua barang',
  new_conditions: 'baru',
  second_conditions: 'bekas',
});

const FORM_NEGOTIABLE = FormWrapper.enums({
  all_prices: 'semua jenis',
  nego_only: 'nego',
  fixed_only: 'harga pas',
});

const FORM_PRICING = FormWrapper.struct({
  kategori: FormWrapper.maybe(FORM_CATEGORIES),
  bisa_nego: FormWrapper.maybe(FORM_NEGOTIABLE),
  top_seller: FormWrapper.maybe(FormWrapper.Boolean),
  condtions: FormWrapper.maybe(FORM_CONDITIONS), // conditions
  price_min: FormWrapper.maybe(FormWrapper.Number),
  price_max: FormWrapper.maybe(FormWrapper.Number),
  province: FormWrapper.maybe(FORM_PROVINCES),
  city: FormWrapper.maybe(FormWrapper.String),
});

const FORM_OPTIONS = {
  stylesheet: styling,
  i18n: {
    optional: '',
  },
  fields: {
    city: {
      factory: AutoInput,
      config: {
        elements: ['Denpasar', 'Bandung', 'Banjar', 'Batu', 'Bekasi', 'Blitar', 'Bogor', 'Cianjur', 'Cilegon', 'Cimahi', 'Cirebon', 'Depok', 'Jakarta', 'Kediri', 'Madiun', 'Magelang', 'Malang', 'Mojokerto', 'Pasuruan', 'Pekalongan', 'Probolinggo', 'Salatiga', 'Semarang', 'Serang', 'South', 'Sukabumi', 'Surabaya', 'Surakarta', 'Tasikmalaya', 'Tangerang', 'Tegal', 'Yogyakarta', 'Balikpapan', 'Banjarbaru', 'Banjarmasin', 'Bontang', 'Palangkaraya', 'Pontianak', 'Samarinda', 'Singkawang', 'Tarakan', 'Tenggarong', 'Ambon', 'Tual', 'Ternate', 'Tidore', 'Bima', 'Mataram', 'Kupang', 'Atambua', 'Jayapura', 'Merauke', 'Kota Sorong', 'Manokwari', 'Bau-Bau', 'Bitung', 'Gorontalo', 'Kendari', 'Kotamobagu', 'Makassar', 'Manado', 'Palu', 'Pare-Pare', 'Palopo', 'Tomohon', 'Banda Aceh', 'Bandar Lampung', 'Batam	Batam', 'Bengkulu', 'Binjai', 'Bukittinggi', 'Dumai', 'Gunungsitoli', 'Jambi', 'Langsa', 'Lhokseumawe', 'Lubuklinggau', 'Medan', 'Metro', 'Padang', 'Padang Panjang', 'Padang Sidempuan', 'Pagar Alam', 'Palembang', 'Pangkal Pinang', 'Pariaman', 'Payakumbuh', 'Pekanbaru', 'Pematang Siantar', 'Prabumulih', 'Sabang', 'Sawah Lunto', 'Sibolga', 'Solok', 'Sungai Penuh', 'Tanjung Balai', 'Tanjung Pinang', 'Tebing Tinggi'],
        propForQuery: 'name',
      },
      label: 'City',
    },
  },
};

// === Main Component ===
class PricingFilter extends Component {
  navigation = null;

  static navigationOptions = {
    title: 'Advanced Filter',
    headerLeft: null,
    headerRight: (
      <TouchableOpacity
        onPress={() => navigation.navigate('PricingAnalysis')}
        style={{justifyContent: 'center', alignItems: 'center', padding: 8, paddingTop: 12}}>
      <Icon name='cross' color='black' size={24} />
      </TouchableOpacity>
    ),
  };

  constructor(props) {
    super(props);
    navigation = this.props.navigation;
  }

  render() {
    return (
      <View style={AppStyles.container}>
        <View style={[styles.formArea]}>
          <ScrollView style={[styles.scrollview, AppStyles.paddingLeft, AppStyles.paddingRight]}>
            <Form
              ref="form"
              type={FORM_PRICING}
              options={FORM_OPTIONS}
            />
          </ScrollView>
        </View>
        <View style={[styles.submitArea, AppStyles.paddingLeft, AppStyles.paddingRight]}>
          <Button
          style={AppStyles.flex1}
          title="Reset Filter"
          onPress={()=>{this.props.navigation.navigate('PricingAnalysis')}}
          color="#aaa"
          />
          <Button
            style={AppStyles.flex1}
            title="Save Filter"
            onPress={()=>{this.props.navigation.navigate('PricingAnalysis')}}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  hello: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  scrollview: {
    flex: 1
  },
  formArea: {
    flex: 9,
    paddingTop: 15,
  },
  submitArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default PricingFilter;
