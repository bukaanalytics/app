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
  province: FormWrapper.maybe(FORM_PROVINCES),
  city: FormWrapper.maybe(FormWrapper.String),
  bisa_nego: FormWrapper.maybe(FORM_NEGOTIABLE),
  top_seller: FormWrapper.maybe(FormWrapper.Boolean),
  condtions: FormWrapper.maybe(FORM_CONDITIONS), // conditions
  price_min: FormWrapper.maybe(FormWrapper.Number),
  price_max: FormWrapper.maybe(FormWrapper.Number),
});

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

  handleSubmit() {
    const value = this.form.getValue();
    console.log("getvalue di handlesubmit",value);
    if (value) {
      this.props.setData('category_id', parseInt(value.kategori.replace("_","")));

      if (value.bisa_nego == 'all_prices') {
        this.props.setData('nego', 1);
        this.props.setData('harga_pas', 1);
      } else if (value.bisa_nego == 'nego_only') {
        this.props.setData('nego', 1);
        this.props.setData('harga_pas', 0);
      } else if (value.bisa_nego == 'fixed_only') {
        this.props.setData('nego', 0);
        this.props.setData('harga_pas', 1);
      }

      if (value.top_seller) {
        this.props.setData('top_seller', 1);
      } else {
        this.props.setData('top_seller', 0);
      }

      if (value.conditions == 'all_conditions') {
        this.props.setData('conditions', 'new');
      } else if (value.conditions == 'new_conditions') {
        this.props.setData('conditions', 'new');
      } else if (value.conditions == 'second_conditions') {
        this.props.setData('conditions', 'used');
      }

      this.props.setData('price_min', value.price_min);
      this.props.setData('price_max', value.price_max);

      if (value.province && value.city) {
        this.props.setData('province', value.province.replace("_"," "));
        this.props.setData('city', value.city);
      }

    }
  }

  render() {
    let FORM_VALUE = {
      category_id: "_159",
      city: "Jakarta",
    };

    if (this.props.form_value ) {
        FORM_VALUE = {
          category_id: this.props.form_value.category_id,
        };
    }

    const FORM_OPTIONS = {
      stylesheet: styling,
      i18n: {
        optional: '',
      },
      fields: {
        city: {
          factory: AutoInput,
          config: {
            elements: ['Badung', 'Bangli', 'Buleleng', 'Denpasar', 'Gianyar', 'Jembrana', 'Karangasem', 'Klungkung', 'Tabanan', 'Cilegon', 'Lebak', 'Pandeglang', 'Serang', 'Kab. Serang', 'Tangerang', 'Kab. Tangerang', 'Tangerang Selatan', 'Bengkulu', 'Bengkulu Selatan', 'Bengkulu Tengah', 'Bengkulu Utara', 'Kaur', 'Kepahiang', 'Lebong',  'Mukomuko', 'Rejang Lebong', 'Seluma', 'Bantul', 'Gunung Kidul', 'Kulon Progo', 'Sleman', 'Yogyakarta', 'Jakarta Barat', 'Jakarta Pusat', 'Jakarta Selatan', 'Jakarta Timur', 'Jakarta Utara', 'Kepulauan Seribu', 'Boalemo', 'Bone Bolango', 'Gorontalo', 'Kab. Gorontalo', 'Gorontalo Utara', 'Pohuwato', 'Batang Hari', 'Bungo', 'Jambi', 'Kerinci', 'Merangin', 'Muaro Jambi', 'Sarolangun', 'Sungai Penuh', 'Tanjung Jabung Barat', 'Tanjung Jabung Timur', 'Tebo', 'Bandung', 'Kab. Bandung', 'Bandung Barat', 'Banjar', 'Bekasi', 'Kab. Bekasi', 'Bogor', 'Kab. Bogor', 'Ciamis', 'Cianjur', 'Cimahi', 'Cirebon', 'Kab. Cirebon', 'Depok', 'Garut', 'Indramayu', 'Karawang', 'Kuningan', 'Majalengka', 'Pangandaran', 'Purwakarta', 'Subang', 'Sukabumi', 'Kab. Sukabumi', 'Sumedang', 'Tasikmalaya', 'Kab. Tasikmalaya', 'Banjarnegara', 'Banyumas', 'Batang', 'Blora', 'Boyolali', 'Brebes', 'Cilacap', 'Demak', 'Grobogan', 'Jepara', 'Karanganyar', 'Kebumen', 'Kendal', 'Klaten', 'Kudus', 'Magelang', 'Kab. Magelang', 'Pati', 'Pekalongan', 'Kab. Pekalongan', 'Pemalang', 'Purbalingga', 'Purworejo', 'Rembang', 'Salatiga', 'Semarang', 'Kab. Semarang', 'Sragen', 'Solo', 'Sukoharjo', 'Tegal', 'Kab. Tegal', 'Temanggung', 'Wonogiri', 'Wonosobo', 'Bangkalan', 'Banyuwangi', 'Batu', 'Blitar', 'Kab. Blitar', 'Bojonegoro', 'Bondowoso', 'Gresik', 'Jember', 'Jombang', 'Kediri', 'Kab. Kediri', 'Lamongan', 'Lumajang', 'Madiun', 'Kab. Madiun', 'Magetan', 'Malang', 'Kab. Malang', 'Mojokerto', 'Kab. Mojokerto', 'Nganjuk', 'Ngawi', 'Pacitan', 'Pamekasan', 'Pasuruan', 'Kab. Pasuruan', 'Ponorogo', 'Probolinggo', 'Kab. Probolinggo', 'Sampang', 'Sidoarjo', 'Situbondo', 'Sumenep', 'Surabaya', 'Trenggalek', 'Tuban', 'Tulungagung', 'Bengkayang', 'Kapuas Hulu', 'Kayong Utara', 'Ketapang', 'Kubu Raya', 'Landak', 'Melawi', 'Pontianak', 'Kab. Pontianak', 'Sambas', 'Sanggau', 'Sekadau', 'Singkawang', 'Sintang', 'Balangan', 'Kab. Banjar', 'Banjarbaru', 'Banjarmasin', 'Barito Kuala', 'Hulu Sungai Selatan', 'Hulu Sungai Tengah', 'Hulu Sungai Utara', 'Kotabaru', 'Tabalong', 'Tanah Bumbu', 'Tanah Laut', 'Tapin', 'Barito Selatan', 'Barito Timur', 'Barito Utara', 'Gunung Mas', 'Kapuas', 'Katingan', 'Kotawaringin Barat', 'Kotawaringin Timur', 'Lamandau', 'Murung Raya', 'Palangkaraya', 'Pulang Pisau', 'Seruyan', 'Sukamara', 'Balikpapan', 'Berau', 'Bontang', 'Kutai Barat', 'Kutai Kartanegara', 'Kutai Timur', 'Mahakam Ulu', 'Paser', 'Penajam Paser Utara', 'Samarinda', 'Bulungan', 'Malinau', 'Nunukan', 'Tana Tidung', 'Tarakan', 'Bangka', 'Bangka Barat', 'Bangka Selatan', 'Bangka Tengah', 'Belitung', 'Belitung Timur', 'Pangkal Pinang', 'Batam', 'Bintan', 'Karimun', 'Kepulauan Anambas', 'Lingga', 'Natuna', 'Tanjung Pinang', 'Bandar Lampung', 'Lampung Barat', 'Lampung Selatan', 'Lampung Tengah', 'Lampung Timur', 'Lampung Utara', 'Mesuji', 'Metro', 'Pesawaran', 'Pesisir Barat', 'Pringsewu', 'Tanggamus', 'Tulang Bawang', 'Tulang Bawang Barat', 'Way Kanan', 'Ambon', 'Buru', 'Buru Selatan', 'Kepulauan Aru', 'Maluku Barat Daya', 'Maluku Tengah', 'Maluku Tenggara', 'Maluku Tenggara Barat', 'Seram Bagian Barat', 'Seram Bagian Timur', 'Seram Barat', 'Seram Timur', 'Tual', 'Halmahera Barat', 'Halmahera Selatan', 'Halmahera Tengah', 'Halmahera Timur', 'Halmahera Utara', 'Kepulauan Sula', 'Pulau Morotai', 'Ternate', 'Tidore Kepulauan', 'Aceh Barat', 'Aceh Barat Daya', 'Aceh Besar', 'Aceh Jaya', 'Aceh Selatan', 'Aceh Singkil', 'Aceh Tamiang', 'Aceh Tengah', 'Aceh Tenggara', 'Aceh Timur', 'Aceh Utara', 'Banda Aceh', 'Bener Meriah', 'Bireuen', 'Gayo Lues', 'Langsa', 'Lhokseumawe', 'Nagan Raya', 'Pidie', 'Pidie Jaya', 'Sabang', 'Simeulue', 'Subulussalam', 'Bima', 'Kab. Bima', 'Dompu', 'Lombok Barat', 'Lombok Tengah', 'Lombok Timur', 'Lombok Utara', 'Mataram', 'Sumbawa', 'Sumbawa Barat', 'Alor', 'Belu', 'Ende', 'Flores Timur', 'Kupang', 'Kab. Kupang', 'Lembata', 'Malaka', 'Manggarai', 'Manggarai Barat', 'Manggarai Timur', 'Nagekeo', 'Ngada', 'Rote Ndao', 'Sabu Raijua', 'Sikka', 'Sumba Barat', 'Sumba Barat Daya', 'Sumba Tengah', 'Sumba Timur', 'Timor Tengah Selatan', 'Timor Tengah Utara', 'Asmat', 'Biak Numfor', 'Boven Digoel', 'Deiyai', 'Dogiyai', 'Intan Jaya', 'Jayapura', 'Kab. Jayapura', 'Jayawijaya', 'Keerom', 'Kepulauan Yapen', 'Lanny Jaya', 'Mamberamo Raya', 'Mamberamo Tengah', 'Mappi', 'Merauke', 'Mimika', 'Nabire', 'Nduga', 'Paniai', 'Pegunungan Bintang', 'Puncak', 'Puncak Jaya', 'Sarmi', 'Supiori', 'Tolikara', 'Waropen', 'Yahukimo', 'Yalimo', 'Fakfak', 'Kaimana', 'Manokwari', 'Manokwari Selatan', 'Maybrat', 'Pegunungan Arfak', 'Raja Ampat', 'Sorong', 'Kab. Sorong', 'Sorong Selatan', 'Tambrauw', 'Teluk Bintuni', 'Teluk Wondama', 'Bengkalis', 'Dumai', 'Indragiri Hilir', 'Indragiri Hulu', 'Kampar', 'Kepulauan Meranti', 'Kuantan Singingi', 'Pekanbaru', 'Pelalawan', 'Rokan Hilir', 'Rokan Hulu', 'Siak', 'Majene', 'Mamasa', 'Mamuju', 'Mamuju Tengah', 'Mamuju Utara', 'Polewali Mandar', 'Bantaeng', 'Barru', 'Bone', 'Bulukumba', 'Enrekang', 'Gowa', 'Jeneponto', 'Kepulauan Selayar', 'Luwu', 'Luwu Timur', 'Luwu Utara', 'Makassar', 'Maros', 'Palopo', 'Pangkajene dan Kepulauan', 'Parepare', 'Pinrang', 'Sidenreng Rappang', 'Sinjai', 'Soppeng', 'Takalar', 'Tana Toraja', 'Toraja Utara', 'Wajo', 'Banggai', 'Banggai Kepulauan', 'Banggai Laut', 'Buol', 'Donggala', 'Morowali', 'Morowali Utara', 'Palu', 'Parigi Moutong', 'Poso', 'Sigi', 'Tojo Una-Una', 'Toli-Toli', 'Bau-Bau', 'Bombana', 'Buton', 'Buton Selatan', 'Buton Tengah', 'Buton Utara', 'Kendari', 'Kolaka', 'Kolaka Timur', 'Kolaka Utara', 'Konawe', 'Konawe Kepulauan', 'Konawe Selatan', 'Konawe Utara', 'Muna', 'Wakatobi', 'Bitung', 'Bolaang Mongondow', 'Bolaang Mongondow Selatan', 'Bolaang Mongondow Timur', 'Bolaang Mongondow Utara', 'Kepulauan Sangihe', 'Kepulauan Siau Tagulandang Biaro', 'Kepulauan Talaud', 'Kotamobagu', 'Manado', 'Minahasa', 'Minahasa Selatan', 'Minahasa Tenggara', 'Minahasa Utara', 'Tomohon', 'Agam', 'Bukittinggi', 'Dharmasraya', 'Kepulauan Mentawai', 'Lima Puluh Kota', 'Padang', 'Padang Pariaman', 'Padangpanjang', 'Pariaman', 'Pasaman', 'Pasaman Barat', 'Payakumbuh', 'Pesisir Selatan', 'Sawahlunto', 'Sijunjung', 'Solok', 'Kab. Solok', 'Solok Selatan', 'Tanah Datar', 'Banyuasin', 'Empat Lawang', 'Lahat', 'Lubuklinggau', 'Muara Enim', 'Musi Banyuasin', 'Musi Rawas', 'Ogan Ilir', 'Ogan Komering Ilir', 'Ogan Komering Ulu', 'Ogan Komering Ulu Selatan', 'Ogan Komering Ulu Timur', 'Pagar Alam', 'Palembang', 'Penukal Abab Lematang Ilir', 'Prabumulih', 'Asahan', 'Batu Bara', 'Binjai', 'Dairi', 'Deli Serdang', 'Gunung Sitoli', 'Humbang Hasundutan', 'Karo', 'Labuhanbatu', 'Labuhanbatu Selatan', 'Labuhanbatu Utara', 'Langkat', 'Mandailing Natal', 'Medan', 'Nias', 'Nias Barat', 'Nias Selatan', 'Nias Utara', 'Padang Lawas', 'Padang Lawas Utara', 'Padang Sidempuan', 'Pakpak Barat', 'Pematangsiantar', 'Samosir', 'Serdang Bedagai', 'Sibolga', 'Simalungun', 'Tanjung Balai', 'Tapanuli Selatan', 'Tapanuli Tengah', 'Tapanuli Utara', 'Tebing Tinggi', 'Toba Samosir'],
            propForQuery: 'name',
          },
          label: 'City',
        },
        category_id: {
          selectedValue: '_159'
        }
      },
    };

    return (
      <View style={AppStyles.container}>
        <View style={[styles.formArea]}>
          <ScrollView style={[styles.scrollview, AppStyles.paddingLeft, AppStyles.paddingRight]}>
            <Form
              ref={f => this.form = f}
              type={FORM_PRICING}
              value={{
                kategori: this.props.form_value.kategori,
                bisa_nego: this.props.form_value.bisa_nego,
                top_seller: this.props.form_value.top_seller,
                province: this.props.form_value.province,
                city: this.props.form_value.city,
                price_min: this.props.form_value.price_min,
                price_max: this.props.form_value.price_max,
              }}
              options={FORM_OPTIONS}
            />
          </ScrollView>
        </View>
        <View style={[styles.submitArea, AppStyles.paddingLeft, AppStyles.paddingRight]}>
          <Button
          style={AppStyles.flex1}
          title="Reset Filter"
          onPress={()=>{
            this.props.navigation.navigate('PricingAnalysis');
            this.props.resetData();
          }}
          color="#aaa"
          />
          <Button
            style={AppStyles.flex1}
            title="Save Filter"
            onPress={()=>{
              this.handleSubmit();
              this.props.navigation.navigate('PricingAnalysis')
            }}
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
