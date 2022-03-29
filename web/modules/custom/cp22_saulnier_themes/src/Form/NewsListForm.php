<?php

namespace Drupal\cp22_saulnier_themes\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\cp22_saulnier_themes\Manager\ThemeTaxonomyManager;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\RequestStack;

class NewsListForm extends FormBase{

  protected $themeTaxonomyManager;

  public function __construct(ThemeTaxonomyManager $themeTaxonomyManager, RequestStack $requestStack){
    $this->themeTaxonomyManager = $themeTaxonomyManager;
    $this->requestStack = $requestStack;
  }

  public static function create(ContainerInterface $container){
    return new static(
      $container->get('Drupal\cp22_saulnier_themes\Manager\ThemeTaxonomyManager'),
      $container->get('request_stack')
    );
  }

  public function getFormId() {
    // TODO: Implement getFormId() method.
    return 'news_list_form';
  }

  public function buildForm(array $form, FormStateInterface $form_state) {
    // TODO: Implement buildForm() method.
    $form['theme'] = [
      '#type' => 'select',
      '#title' => $this->t('Filtrer par Théme :'),
      '#options' => $this->themeTaxonomyManager->getList(),
      '#empty_option' => $this->t('Thémes'),
      '#default_value'=>$this->requestStack->getCurrentRequest()->get('theme'),
      '#attributes' => array('onchange' => 'this.form.submit();'),
    ];

    $form['sort_date'] = [
      '#type' => 'select',
      '#title' => $this->t('Trier par date :'),
      '#options' => [
        'ASC' => $this->t('Croissant'),
        'DESC' => $this->t('Décroissant'),
      ],
      '#empty_option' => $this->t('Date de publication'),
      '#default_value' => $this->requestStack->getCurrentRequest()->get('date-sort'),
      '#attributes' => array('onchange' => 'this.form.submit();'),
    ];

    $form['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Submit'),
    ];

    return $form;
  }

  //Validation du formulaire pour voir si non conforme
//  public function validateForm(array &$form, FormStateInterface $form_state) {
//    parent::validateForm($form, $form_state);
//    if($form_state->getValue('theme') == 2){
//      $form_state->setErrorByName('theme','Non pas le 2');
//    }
//  }

  public function submitForm(array &$form, FormStateInterface $form_state) {

    $themeValue = $form_state->cleanValues()->getValue('theme');
    $dateSort = $form_state->cleanValues()->getValue('sort_date');

    if (!empty($themeValue)){
      $this->requestStack->getCurrentRequest()->query->set('theme',$themeValue);
    }
    if (!empty($dateSort)){
      $this->requestStack->getCurrentRequest()->query->set('date-sort', $dateSort);
    }

//    $stop='';
  }
}
