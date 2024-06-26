import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native'
import React, { useMemo } from 'react'
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import Animated, {
  Extrapolation,
  FadeInDown,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { hp } from '../../helpers/common'
import { PRIMARY_COLOR, theme } from '../../constants/theme'
import { OrderView, SectionVIew } from './SectionVIew'
import { filtersData } from '../../constants/data'

const FiltersModal = (props) => {
  const { modalRef, filters, setFilters, clearFilter, applyFilter } =
    props || {}
  // variables
  const snapPoints = useMemo(() => ['70%', '85%'], [])
  return (
    <BottomSheetModal
      ref={modalRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={CustomBackground}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.content}>
          <Text style={styles.filterText}>Filters</Text>
          {Object.keys(sections)?.map((sectionName, index) => {
            let sectionView = sections[sectionName]
            let sectionData = filtersData?.[sectionName]

            return (
              <Animated.View
                key={index}
                entering={FadeInDown.delay(index * 100 + 100)
                  .springify()
                  .damping(11)}
              >
                <SectionVIew
                  title={sectionName}
                  content={sectionView({
                    data: sectionData,
                    filters,
                    filterName: sectionName,
                    setFilters,
                  })}
                />
              </Animated.View>
            )
          })}

          <Animated.View
            entering={FadeInDown.delay(500).springify().damping(11)}
            style={styles.buttonView}
          >
            <Pressable style={styles.applyBtn} onPress={applyFilter}>
              <Text style={styles.textApply}>Apply</Text>
            </Pressable>

            <Pressable style={styles.resetBtN}>
              <Text style={styles.textReset} onPress={clearFilter}>
                Reset
              </Text>
            </Pressable>
          </Animated.View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  )
}

const sections = {
  order: (props) => <OrderView {...props} />,
  orientation: (props) => <OrderView {...props} />,
  type: (props) => <OrderView {...props} />,
  colors: (props) => <OrderView {...props} />,
}

const CustomBackground = ({ animatedIndex, style }) => {
  const containerAnimatedStyle = useAnimatedStyle(() => {
    let opacity = interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 1],
      Extrapolation.CLAMP
    )
    return { opacity }
  })

  const containerStyle = [
    StyleSheet.absoluteFill,
    style,
    styles.overlay,
    containerAnimatedStyle,
  ]
  return <Animated.View style={containerStyle}></Animated.View>
}
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    flex: 1,
    gap: 10,
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  filterText: {
    fontSize: hp(2.5),
    fontWeight: theme.fontWeight.bold,
    marginBottom: 5,
  },
  buttonView: {
    flexDirection: 'row',
    gap: 10,
    flex: 1,
    alignItems: 'center',
  },
  applyBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: theme.radius.md,
    borderCurve: 'continuous',
    backgroundColor: theme.colors.neutral(0.1),
  },
  resetBtN: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 12,
    borderRadius: theme.radius.md,
    borderCurve: 'continuous',
    backgroundColor: PRIMARY_COLOR,
  },
  textApply: {
    color: theme.colors.black,
    fontSize: hp(1.8),
    fontWeight: theme.fontWeight.semibold,
  },
  textReset: {
    color: theme.colors.white,
    fontSize: hp(1.8),
  },
})
export default FiltersModal
